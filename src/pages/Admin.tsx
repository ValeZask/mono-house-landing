import { useState, useEffect } from 'react';
import { supabase, PortfolioImage } from '../lib/supabase';
import { useDropzone } from 'react-dropzone';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Trash2, Upload, LogOut, GripVertical } from 'lucide-react';

function SortableItem({ image, onDelete }: { image: PortfolioImage; onDelete: (id: string) => void }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: image.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-md border-2 border-gray-200 hover:border-blue-400 transition-colors"
    >
      <div {...attributes} {...listeners} className="cursor-grab active:cursor-grabbing">
        <GripVertical className="w-6 h-6 text-gray-400" />
      </div>
      
      <img
        src={image.image_url}
        alt="Portfolio"
        className="w-20 h-20 object-cover rounded-md"
      />
      
      <div className="flex-1">
        <p className="text-sm text-gray-600">Позиция: {image.display_order}</p>
      </div>
      
      <button
        onClick={() => onDelete(image.id)}
        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
      >
        <Trash2 className="w-5 h-5" />
      </button>
    </div>
  );
}

export function Admin() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [images, setImages] = useState<PortfolioImage[]>([]);
  const [uploading, setUploading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    setUser(session?.user ?? null);
    setLoading(false);
    if (session?.user) {
      fetchImages();
    }
  };

  const fetchImages = async () => {
    const { data, error } = await supabase
      .from('portfolio_images')
      .select('*')
      .order('display_order', { ascending: true });

    if (error) {
      console.error('Error fetching images:', error);
    } else {
      setImages(data || []);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setLoginError('Неверный email или пароль');
    } else {
      setUser(data.user);
      fetchImages();
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setImages([]);
  };

const onDrop = async (acceptedFiles: File[]) => {
  setUploading(true);
  console.log('Starting upload for', acceptedFiles.length, 'files');

  // Находим текущий максимум display_order
  let maxOrder = images.length > 0
    ? Math.max(...images.map(img => img.display_order))
    : 0;

  for (const file of acceptedFiles) {
    try {
      console.log('Uploading file:', file.name, 'Size:', file.size);

      // Генерируем уникальное имя файла
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;
      
      console.log('Generated filename:', fileName);

      // Загружаем в Storage
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('portfolio')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) throw uploadError;

      // Получаем публичный URL
      const { data: { publicUrl } } = supabase.storage
        .from('portfolio')
        .getPublicUrl(fileName);

      // Увеличиваем maxOrder для каждого файла
      maxOrder += 1;

      // Добавляем запись в БД
      const { data: dbData, error: dbError } = await supabase
        .from('portfolio_images')
        .insert([{ image_url: publicUrl, display_order: maxOrder }])
        .select();

      if (dbError) throw dbError;

      console.log('✅ Successfully uploaded:', file.name);
    } catch (error: any) {
      console.error('❌ Error uploading file:', error);
      alert(`Ошибка при загрузке "${file.name}": ${error.message || JSON.stringify(error)}`);
    }
  }

  setUploading(false);
  await fetchImages();
};



  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.png', '.jpg', '.jpeg', '.webp'] },
    multiple: true,
  });

  const handleDelete = async (id: string) => {
    if (!confirm('Удалить это изображение?')) return;

    const image = images.find(img => img.id === id);
    if (!image) return;

    try {
      // Удаляем из Storage
      const fileName = image.image_url.split('/').pop();
      if (fileName) {
        await supabase.storage.from('portfolio').remove([fileName]);
      }

      // Удаляем из базы данных
      const { error } = await supabase
        .from('portfolio_images')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      fetchImages();
    } catch (error) {
      console.error('Error deleting image:', error);
      alert('Ошибка при удалении');
    }
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = images.findIndex(img => img.id === active.id);
      const newIndex = images.findIndex(img => img.id === over.id);

      const newImages = arrayMove(images, oldIndex, newIndex);
      setImages(newImages);

      // Обновляем порядок в базе данных
      try {
        const updates = newImages.map((img, index) => ({
          id: img.id,
          display_order: index + 1,
        }));

        for (const update of updates) {
          await supabase
            .from('portfolio_images')
            .update({ display_order: update.display_order })
            .eq('id', update.id);
        }
      } catch (error) {
        console.error('Error updating order:', error);
        fetchImages(); // Восстанавливаем порядок из БД
      }
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Загрузка...</div>;
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
          <h1 className="text-2xl font-bold mb-6 text-center">Вход в админ-панель</h1>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Пароль</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            
            {loginError && (
              <p className="text-red-600 text-sm">{loginError}</p>
            )}
            
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Войти
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Управление портфолио</h1>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Выйти
          </button>
        </div>

        {/* Зона загрузки */}
        <div
          {...getRootProps()}
          className={`mb-8 p-12 border-2 border-dashed rounded-xl text-center cursor-pointer transition-colors ${
            isDragActive
              ? 'border-blue-500 bg-blue-50'
              : 'border-gray-300 hover:border-blue-400 bg-white'
          }`}
        >
          <input {...getInputProps()} />
          <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
          {uploading ? (
            <p className="text-lg">Загрузка...</p>
          ) : isDragActive ? (
            <p className="text-lg">Отпустите файлы сюда...</p>
          ) : (
            <>
              <p className="text-lg mb-2">Перетащите изображения сюда</p>
              <p className="text-sm text-gray-500">или кликните для выбора файлов</p>
            </>
          )}
        </div>

        {/* Список изображений с drag-and-drop */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold mb-4">
            Изображения ({images.length})
          </h2>
          
          {images.length === 0 ? (
            <p className="text-center text-gray-500 py-12">Нет изображений. Загрузите первое!</p>
          ) : (
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext items={images.map(img => img.id)} strategy={verticalListSortingStrategy}>
                {images.map((image) => (
                  <SortableItem key={image.id} image={image} onDelete={handleDelete} />
                ))}
              </SortableContext>
            </DndContext>
          )}
        </div>
      </div>
    </div>
  );
}