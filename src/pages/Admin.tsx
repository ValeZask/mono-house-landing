import { useState, useEffect } from 'react';
import { supabase, PortfolioImage } from '../lib/supabase';
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Trash2, Upload, LogOut, GripVertical, Plus, Image as ImageIcon, ChevronUp, ChevronDown, ChevronsUp, ChevronsDown } from 'lucide-react';

function SortableItem({ 
  image, 
  onDelete, 
  onMoveUp, 
  onMoveDown, 
  onMoveTop, 
  onMoveBottom,
  isFirst, 
  isLast,
  isMobile 
}: { 
  image: PortfolioImage; 
  onDelete: (id: string) => void;
  onMoveUp: (id: string) => void;
  onMoveDown: (id: string) => void;
  onMoveTop: (id: string) => void;
  onMoveBottom: (id: string) => void;
  isFirst: boolean;
  isLast: boolean;
  isMobile: boolean;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: image.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  if (isMobile) {
    // Мобильная версия с кнопками
    return (
      <div className="bg-white rounded-lg shadow-md border-2 border-gray-200 overflow-hidden">
        <div className="flex items-center gap-3 p-3">
          <img
            src={image.image_url}
            alt="Portfolio"
            className="w-20 h-20 object-cover rounded-md flex-shrink-0"
          />
          
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-700">Позиция: {image.display_order}</p>
          </div>
          
          <button
            onClick={() => onDelete(image.id)}
            className="p-2 text-red-600 hover:bg-red-50 active:bg-red-100 rounded-lg transition-colors flex-shrink-0"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
        
        {/* Кнопки управления порядком */}
        <div className="border-t border-gray-200 p-2 flex gap-2">
          <button
            onClick={() => onMoveTop(image.id)}
            disabled={isFirst}
            className="flex-1 flex items-center justify-center gap-1 py-2 px-3 bg-gray-100 text-gray-700 rounded-lg disabled:opacity-30 disabled:cursor-not-allowed active:bg-gray-200 transition-colors text-sm font-medium"
          >
            <ChevronsUp className="w-4 h-4" />
            <span>В начало</span>
          </button>
          
          <button
            onClick={() => onMoveUp(image.id)}
            disabled={isFirst}
            className="flex items-center justify-center p-2 bg-gray-100 text-gray-700 rounded-lg disabled:opacity-30 disabled:cursor-not-allowed active:bg-gray-200 transition-colors"
          >
            <ChevronUp className="w-5 h-5" />
          </button>
          
          <button
            onClick={() => onMoveDown(image.id)}
            disabled={isLast}
            className="flex items-center justify-center p-2 bg-gray-100 text-gray-700 rounded-lg disabled:opacity-30 disabled:cursor-not-allowed active:bg-gray-200 transition-colors"
          >
            <ChevronDown className="w-5 h-5" />
          </button>
          
          <button
            onClick={() => onMoveBottom(image.id)}
            disabled={isLast}
            className="flex-1 flex items-center justify-center gap-1 py-2 px-3 bg-gray-100 text-gray-700 rounded-lg disabled:opacity-30 disabled:cursor-not-allowed active:bg-gray-200 transition-colors text-sm font-medium"
          >
            <ChevronsDown className="w-4 h-4" />
            <span>В конец</span>
          </button>
        </div>
      </div>
    );
  }

  // Десктопная версия с drag-and-drop
  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`flex items-center gap-4 p-4 bg-white rounded-lg shadow-md border-2 border-gray-200 hover:border-blue-400 transition-colors ${
        isDragging ? 'z-50' : ''
      }`}
    >
      <div {...attributes} {...listeners} className="cursor-grab active:cursor-grabbing">
        <GripVertical className="w-6 h-6 text-gray-400" />
      </div>
      
      <img
        src={image.image_url}
        alt="Portfolio"
        className="w-20 h-20 object-cover rounded-md flex-shrink-0"
      />
      
      <div className="flex-1 min-w-0">
        <p className="text-sm text-gray-600">Позиция: {image.display_order}</p>
      </div>
      
      <button
        onClick={() => onDelete(image.id)}
        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors flex-shrink-0"
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
  const [isMobile, setIsMobile] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragCounter, setDragCounter] = useState(0);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
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

  const reorderImages = async (updatedImages: PortfolioImage[]) => {
    const reorderedImages = updatedImages.map((img, index) => ({
      ...img,
      display_order: index + 1,
    }));

    setImages(reorderedImages);

    try {
      for (const img of reorderedImages) {
        await supabase
          .from('portfolio_images')
          .update({ display_order: img.display_order })
          .eq('id', img.id);
      }
    } catch (error) {
      console.error('Error reordering:', error);
      fetchImages();
    }
  };

  const handleFileInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;
    
    await uploadFiles(files);
    e.target.value = '';
  };

  // Обработчики для drag and drop
  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isMobile) {
      setDragCounter(prev => prev + 1);
      if (e.dataTransfer.types.includes('Files')) {
        setIsDragging(true);
      }
    }
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isMobile) {
      setDragCounter(prev => {
        const newCount = prev - 1;
        if (newCount === 0) {
          setIsDragging(false);
        }
        return newCount;
      });
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragCounter(0);
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files);
    if (files.length === 0) return;

    const imageFiles = files.filter(file => 
      file.type.startsWith('image/')
    );

    if (imageFiles.length > 0) {
      await uploadFiles(imageFiles);
    }
  };

  const uploadFiles = async (files: File[]) => {
    setUploading(true);
    console.log('Starting upload for', files.length, 'files');

    let maxOrder = images.length > 0
      ? Math.max(...images.map(img => img.display_order))
      : 0;

    for (const file of files) {
      try {
        console.log('Uploading file:', file.name, 'Size:', file.size);

        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;
        
        console.log('Generated filename:', fileName);

        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('portfolio')
          .upload(fileName, file, {
            cacheControl: '3600',
            upsert: false
          });

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from('portfolio')
          .getPublicUrl(fileName);

        maxOrder += 1;

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

  const handleDelete = async (id: string) => {
    if (!confirm('Удалить это изображение?')) return;

    const image = images.find(img => img.id === id);
    if (!image) return;

    try {
      const fileName = image.image_url.split('/').pop();
      if (fileName) {
        await supabase.storage.from('portfolio').remove([fileName]);
      }

      const { error } = await supabase
        .from('portfolio_images')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      const updatedImages = images.filter(img => img.id !== id);
      await reorderImages(updatedImages);
      
    } catch (error) {
      console.error('Error deleting image:', error);
      alert('Ошибка при удалении');
    }
  };

  // Функции для перемещения через кнопки
  const handleMoveUp = async (id: string) => {
    const index = images.findIndex(img => img.id === id);
    if (index <= 0) return;
    
    const newImages = arrayMove(images, index, index - 1);
    await reorderImages(newImages);
  };

  const handleMoveDown = async (id: string) => {
    const index = images.findIndex(img => img.id === id);
    if (index >= images.length - 1) return;
    
    const newImages = arrayMove(images, index, index + 1);
    await reorderImages(newImages);
  };

  const handleMoveTop = async (id: string) => {
    const index = images.findIndex(img => img.id === id);
    if (index <= 0) return;
    
    const newImages = arrayMove(images, index, 0);
    await reorderImages(newImages);
  };

  const handleMoveBottom = async (id: string) => {
    const index = images.findIndex(img => img.id === id);
    if (index >= images.length - 1) return;
    
    const newImages = arrayMove(images, index, images.length - 1);
    await reorderImages(newImages);
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = images.findIndex(img => img.id === active.id);
      const newIndex = images.findIndex(img => img.id === over.id);

      const newImages = arrayMove(images, oldIndex, newIndex);
      await reorderImages(newImages);
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Загрузка...</div>;
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg w-full max-w-md">
          <h1 className="text-xl sm:text-2xl font-bold mb-6 text-center">Вход в админ-панель</h1>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleLogin(e)}
                className="w-full px-4 py-2 sm:py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Пароль</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleLogin(e)}
                className="w-full px-4 py-2 sm:py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            {loginError && (
              <p className="text-red-600 text-sm">{loginError}</p>
            )}
            
            <button
              onClick={handleLogin}
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 active:bg-blue-800 transition-colors font-medium text-base"
            >
              Войти
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 pb-20 sm:pb-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6 sm:mb-8">
          <h1 className="text-xl sm:text-3xl font-bold">Управление портфолио</h1>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 active:bg-gray-400 transition-colors text-sm sm:text-base"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Выйти</span>
          </button>
        </div>

        <div className="mb-6 sm:mb-8">
          <input
            type="file"
            id="fileInput"
            multiple
            accept="image/png,image/jpeg,image/jpg,image/webp"
            onChange={handleFileInput}
            className="hidden"
          />
          <label
            htmlFor="fileInput"
            onDragEnter={handleDragEnter}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`block p-8 sm:p-12 border-2 border-dashed rounded-xl text-center cursor-pointer transition-all ${
              uploading
                ? 'border-gray-300 bg-gray-50 cursor-not-allowed'
                : isDragging && !isMobile
                ? 'border-blue-500 bg-blue-50 scale-105 shadow-lg'
                : 'border-gray-300 hover:border-blue-400 bg-white active:bg-blue-50'
            }`}
          >
            {isMobile ? (
              <Plus className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-3 sm:mb-4 text-gray-400" />
            ) : (
              <Upload className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-3 sm:mb-4 text-gray-400" />
            )}
            {uploading ? (
              <p className="text-base sm:text-lg font-medium">Загрузка...</p>
            ) : (
              <>
                <p className="text-base sm:text-lg mb-2 font-medium">
                  {isMobile 
                    ? 'Нажмите для добавления фото' 
                    : isDragging
                    ? 'Отпустите для загрузки изображений'
                    : 'Выберите или перетащите изображения сюда'}
                </p>
                <p className="text-xs sm:text-sm text-gray-500">
                  {isMobile ? 'Можно выбрать несколько' : 'Поддерживаются PNG, JPG, WEBP'}
                </p>
              </>
            )}
          </label>
        </div>

        <div className="space-y-4">
          <h2 className="text-lg sm:text-xl font-semibold mb-4">
            Изображения ({images.length})
          </h2>
          
          {images.length === 0 ? (
            <div className="text-center text-gray-500 py-12">
              <ImageIcon className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <p className="text-sm sm:text-base">Нет изображений. Загрузите первое!</p>
            </div>
          ) : isMobile ? (
            // Мобильная версия - без drag-and-drop, только кнопки
            <div className="space-y-3">
              {images.map((image, index) => (
                <SortableItem 
                  key={image.id} 
                  image={image} 
                  onDelete={handleDelete}
                  onMoveUp={handleMoveUp}
                  onMoveDown={handleMoveDown}
                  onMoveTop={handleMoveTop}
                  onMoveBottom={handleMoveBottom}
                  isFirst={index === 0}
                  isLast={index === images.length - 1}
                  isMobile={true}
                />
              ))}
            </div>
          ) : (
            // Десктопная версия - с drag-and-drop
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext 
                items={images.map(img => img.id)} 
                strategy={verticalListSortingStrategy}
              >
                <div className="space-y-4">
                  {images.map((image, index) => (
                    <SortableItem 
                      key={image.id} 
                      image={image} 
                      onDelete={handleDelete}
                      onMoveUp={handleMoveUp}
                      onMoveDown={handleMoveDown}
                      onMoveTop={handleMoveTop}
                      onMoveBottom={handleMoveBottom}
                      isFirst={index === 0}
                      isLast={index === images.length - 1}
                      isMobile={false}
                    />
                  ))}
                </div>
              </SortableContext>
            </DndContext>
          )}
        </div>
      </div>
    </div>
  );
}