import { useState, useEffect } from 'react';
import { supabase, PortfolioImage, InstagramReview, ContactSubmission } from '../lib/supabase';
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
import { Trash2, Upload, LogOut, GripVertical, Plus, Image as ImageIcon, ChevronUp, ChevronDown, ChevronsUp, ChevronsDown, Instagram, Link, MessageSquare, Phone, User, Calendar } from 'lucide-react';

function SortableReviewItem({ 
  review, 
  onDelete, 
  onMoveUp, 
  onMoveDown, 
  onMoveTop, 
  onMoveBottom,
  isFirst, 
  isLast,
  isMobile 
}: { 
  review: InstagramReview; 
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
    id: review.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  if (isMobile) {
    return (
      <div className="bg-white rounded-lg shadow-md border-2 border-gray-200 overflow-hidden">
        <div className="flex items-center gap-3 p-3">
          <Instagram className="w-8 h-8 text-pink-500 flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-700 truncate">{review.name}</p>
            <p className="text-xs text-gray-500 truncate">{review.url}</p>
            <p className="text-xs text-gray-400">Позиция: {review.display_order}</p>
          </div>
          <button
            onClick={() => onDelete(review.id)}
            className="p-2 text-red-600 hover:bg-red-50 active:bg-red-100 rounded-lg transition-colors flex-shrink-0"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
        
        <div className="border-t border-gray-200 p-2 flex gap-2">
          <button
            onClick={() => onMoveTop(review.id)}
            disabled={isFirst}
            className="flex-1 flex items-center justify-center gap-1 py-2 px-3 bg-gray-100 text-gray-700 rounded-lg disabled:opacity-30 disabled:cursor-not-allowed active:bg-gray-200 transition-colors text-sm font-medium"
          >
            <ChevronsUp className="w-4 h-4" />
            <span>В начало</span>
          </button>
          
          <button
            onClick={() => onMoveUp(review.id)}
            disabled={isFirst}
            className="flex items-center justify-center p-2 bg-gray-100 text-gray-700 rounded-lg disabled:opacity-30 disabled:cursor-not-allowed active:bg-gray-200 transition-colors"
          >
            <ChevronUp className="w-5 h-5" />
          </button>
          
          <button
            onClick={() => onMoveDown(review.id)}
            disabled={isLast}
            className="flex items-center justify-center p-2 bg-gray-100 text-gray-700 rounded-lg disabled:opacity-30 disabled:cursor-not-allowed active:bg-gray-200 transition-colors"
          >
            <ChevronDown className="w-5 h-5" />
          </button>
          
          <button
            onClick={() => onMoveBottom(review.id)}
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

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`flex items-center gap-4 p-4 bg-white rounded-lg shadow-md border-2 border-gray-200 hover:border-pink-400 transition-colors ${
        isDragging ? 'z-50' : ''
      }`}
    >
      <div {...attributes} {...listeners} className="cursor-grab active:cursor-grabbing">
        <GripVertical className="w-6 h-6 text-gray-400" />
      </div>
      
      <Instagram className="w-8 h-8 text-pink-500 flex-shrink-0" />
      
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-700 truncate">{review.name}</p>
        <p className="text-xs text-gray-500 truncate">{review.url}</p>
        <p className="text-xs text-gray-400">Позиция: {review.display_order}</p>
      </div>
      
      <button
        onClick={() => onDelete(review.id)}
        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors flex-shrink-0"
      >
        <Trash2 className="w-5 h-5" />
      </button>
    </div>
  );
}

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
  const [reviews, setReviews] = useState<InstagramReview[]>([]);
  const [uploading, setUploading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isMobile, setIsMobile] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragCounter, setDragCounter] = useState(0);
  const [activeTab, setActiveTab] = useState<'portfolio' | 'reviews' | 'contacts'>('portfolio');
  const [newReviewName, setNewReviewName] = useState('');
  const [newReviewUrl, setNewReviewUrl] = useState('');
  const [contacts, setContacts] = useState<ContactSubmission[]>([]);

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
        distance: isMobile ? 5 : 8,
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
      fetchReviews();
      fetchContacts();
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

  const fetchReviews = async () => {
    const { data, error } = await supabase
      .from('instagram_reviews')
      .select('*')
      .order('display_order', { ascending: true });

    if (error) {
      console.error('Error fetching reviews:', error);
    } else {
      setReviews(data || []);
    }
  };

  const fetchContacts = async () => {
    const { data, error } = await supabase
      .from('contacts')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching contacts:', error);
    } else {
      setContacts(data || []);
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
      fetchReviews();
      fetchContacts();
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setImages([]);
    setReviews([]);
    setContacts([]);
  };

  // Instagram Reviews Management Functions
  const addReview = async () => {
    if (!newReviewName.trim() || !newReviewUrl.trim()) {
      alert('Пожалуйста, заполните все поля');
      return;
    }

    if (!newReviewUrl.includes('instagram.com')) {
      alert('Пожалуйста, введите корректную ссылку на Instagram');
      return;
    }

    try {
      const maxOrder = reviews.length > 0
        ? Math.max(...reviews.map(r => r.display_order))
        : 0;

      const { data, error } = await supabase
        .from('instagram_reviews')
        .insert([{ 
          name: newReviewName.trim(), 
          url: newReviewUrl.trim(),
          display_order: maxOrder + 1 
        }])
        .select();

      if (error) throw error;

      setNewReviewName('');
      setNewReviewUrl('');
      await fetchReviews();
    } catch (error) {
      console.error('Error adding review:', error);
      alert('Ошибка при добавлении отзыва');
    }
  };

  const deleteReview = async (id: string) => {
    if (!confirm('Удалить этот отзыв?')) return;

    try {
      const { error } = await supabase
        .from('instagram_reviews')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      const updatedReviews = reviews.filter(r => r.id !== id);
      await reorderReviews(updatedReviews);
      
    } catch (error) {
      console.error('Error deleting review:', error);
      alert('Ошибка при удалении');
    }
  };

  const reorderReviews = async (updatedReviews: InstagramReview[]) => {
    const reorderedReviews = updatedReviews.map((review, index) => ({
      ...review,
      display_order: index + 1,
    }));

    setReviews(reorderedReviews);

    try {
      for (const review of reorderedReviews) {
        await supabase
          .from('instagram_reviews')
          .update({ display_order: review.display_order })
          .eq('id', review.id);
      }
    } catch (error) {
      console.error('Error reordering reviews:', error);
      fetchReviews();
    }
  };

  // Review movement functions
  const handleReviewMoveUp = async (id: string) => {
    const index = reviews.findIndex(r => r.id === id);
    if (index <= 0) return;
    
    const newReviews = arrayMove(reviews, index, index - 1);
    await reorderReviews(newReviews);
  };

  const handleReviewMoveDown = async (id: string) => {
    const index = reviews.findIndex(r => r.id === id);
    if (index >= reviews.length - 1) return;
    
    const newReviews = arrayMove(reviews, index, index + 1);
    await reorderReviews(newReviews);
  };

  const handleReviewMoveTop = async (id: string) => {
    const index = reviews.findIndex(r => r.id === id);
    if (index <= 0) return;
    
    const newReviews = arrayMove(reviews, index, 0);
    await reorderReviews(newReviews);
  };

  const handleReviewMoveBottom = async (id: string) => {
    const index = reviews.findIndex(r => r.id === id);
    if (index >= reviews.length - 1) return;
    
    const newReviews = arrayMove(reviews, index, reviews.length - 1);
    await reorderReviews(newReviews);
  };

  const handleReviewDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = reviews.findIndex(r => r.id === active.id);
      const newIndex = reviews.findIndex(r => r.id === over.id);

      const newReviews = arrayMove(reviews, oldIndex, newIndex);
      await reorderReviews(newReviews);
    }
  };

  // Contact Management Functions
  const updateContactStatus = async (id: string, status: 'new' | 'contacted' | 'completed') => {
    try {
      const { error } = await supabase
        .from('contacts')
        .update({ 
          status,
          updated_at: new Date().toISOString()
        })
        .eq('id', id);

      if (error) throw error;
      
      setContacts(contacts.map(contact => 
        contact.id === id 
          ? { ...contact, status, updated_at: new Date().toISOString() }
          : contact
      ));
    } catch (error) {
      console.error('Error updating contact status:', error);
      alert('Ошибка при обновлении статуса');
    }
  };

  const deleteContact = async (id: string) => {
    if (!confirm('Удалить эту заявку?')) return;

    try {
      const { error } = await supabase
        .from('contacts')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      setContacts(contacts.filter(contact => contact.id !== id));
    } catch (error) {
      console.error('Error deleting contact:', error);
      alert('Ошибка при удалении заявки');
    }
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
  
    // фильтр webp + проверка размера ≤ 250 KB
    const validFiles = files.filter(file => {
      const isWebp = file.type === 'image/webp' || file.name.toLowerCase().endsWith('.webp');
      const isSizeOk = file.size <= 250 * 1024;
      return isWebp && isSizeOk;
    });
  
    if (validFiles.length === 0) {
      alert('Нет файлов подходящего формата или размера (только .webp до 250 KB)');
      setUploading(false);
      return;
    }
  
    let maxOrder = images.length > 0
      ? Math.max(...images.map(img => img.display_order))
      : 0;
  
    for (const file of validFiles) {
      try {
        const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.webp`;
  
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('portfolio')
          .upload(fileName, file, {
            cacheControl: '3600',
            upsert: false,
          });
  
        if (uploadError) throw uploadError;
  
        const { data: { publicUrl } } = supabase.storage
          .from('portfolio')
          .getPublicUrl(fileName);
  
        maxOrder += 1;
  
        const { error: dbError } = await supabase
          .from('portfolio_images')
          .insert([{ image_url: publicUrl, display_order: maxOrder }]);
  
        if (dbError) throw dbError;
  
        console.log('✅ Uploaded:', file.name);
      } catch (error: any) {
        console.error('❌ Upload error:', error);
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
          <h1 className="text-xl sm:text-3xl font-bold">Админ-панель</h1>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 active:bg-gray-400 transition-colors text-sm sm:text-base"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Выйти</span>
          </button>
        </div>

        {/* Tabs */}
        <div className="flex flex-col sm:flex-row gap-2 mb-6 sm:mb-8">
          <button
            onClick={() => setActiveTab('portfolio')}
            className={`px-3 sm:px-4 py-2 rounded-lg font-medium transition-colors text-sm sm:text-base ${
              activeTab === 'portfolio'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <ImageIcon className="w-4 h-4 flex-shrink-0" />
              <span className="truncate">Портфолио</span>
            </div>
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`px-3 sm:px-4 py-2 rounded-lg font-medium transition-colors text-sm sm:text-base ${
              activeTab === 'reviews'
                ? 'bg-pink-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <Instagram className="w-4 h-4 flex-shrink-0" />
              <span className="truncate">Отзывы</span>
            </div>
          </button>
          <button
            onClick={() => setActiveTab('contacts')}
            className={`px-3 sm:px-4 py-2 rounded-lg font-medium transition-colors text-sm sm:text-base ${
              activeTab === 'contacts'
                ? 'bg-green-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <MessageSquare className="w-4 h-4 flex-shrink-0" />
              <span className="truncate">Заявки ({contacts.length})</span>
            </div>
          </button>
        </div>

        {/* Portfolio Tab */}
        {activeTab === 'portfolio' && (
          <>
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
                      {isMobile ? 'Можно выбрать несколько' : 'Поддерживается WEBP, максимальный размер 250КБ'}
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
            // Мобильная версия - с кнопками
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
          </>
        )}

        {/* Reviews Tab */}
        {activeTab === 'reviews' && (
          <>
            <div className="mb-6 sm:mb-8">
              <div className="bg-white p-6 rounded-xl shadow-md border-2 border-gray-200">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Plus className="w-5 h-5 text-pink-500" />
                  Добавить новый отзыв
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Имя заказчика
                    </label>
                    <input
                      type="text"
                      value={newReviewName}
                      onChange={(e) => setNewReviewName(e.target.value)}
                      placeholder="Например: Азиз"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Ссылка на Instagram
                    </label>
                    <input
                      type="url"
                      value={newReviewUrl}
                      onChange={(e) => setNewReviewUrl(e.target.value)}
                      placeholder="https://www.instagram.com/p/..."
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    />
                  </div>
                  <button
                    onClick={addReview}
                    className="w-full bg-pink-600 text-white py-2 rounded-lg hover:bg-pink-700 active:bg-pink-800 transition-colors font-medium"
                  >
                    Добавить отзыв
                  </button>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-lg sm:text-xl font-semibold mb-4">
                Отзывы Instagram ({reviews.length})
              </h2>
              
              {reviews.length === 0 ? (
                <div className="text-center text-gray-500 py-12">
                  <Instagram className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                  <p className="text-sm sm:text-base">Нет отзывов. Добавьте первый!</p>
                </div>
              ) : isMobile ? (
                // Мобильная версия - с кнопками
                <div className="space-y-3">
                  {reviews.map((review, index) => (
                    <SortableReviewItem 
                      key={review.id} 
                      review={review} 
                      onDelete={deleteReview}
                      onMoveUp={handleReviewMoveUp}
                      onMoveDown={handleReviewMoveDown}
                      onMoveTop={handleReviewMoveTop}
                      onMoveBottom={handleReviewMoveBottom}
                      isFirst={index === 0}
                      isLast={index === reviews.length - 1}
                      isMobile={true}
                    />
                  ))}
                </div>
              ) : (
                <DndContext
                  sensors={sensors}
                  collisionDetection={closestCenter}
                  onDragEnd={handleReviewDragEnd}
                >
                  <SortableContext 
                    items={reviews.map(r => r.id)} 
                    strategy={verticalListSortingStrategy}
                  >
                    <div className="space-y-4">
                      {reviews.map((review, index) => (
                        <SortableReviewItem 
                          key={review.id} 
                          review={review} 
                          onDelete={deleteReview}
                          onMoveUp={handleReviewMoveUp}
                          onMoveDown={handleReviewMoveDown}
                          onMoveTop={handleReviewMoveTop}
                          onMoveBottom={handleReviewMoveBottom}
                          isFirst={index === 0}
                          isLast={index === reviews.length - 1}
                          isMobile={false}
                        />
                      ))}
                    </div>
                  </SortableContext>
                </DndContext>
              )}
            </div>
          </>
        )}

        {/* Contacts Tab */}
        {activeTab === 'contacts' && (
          <div className="space-y-4">
            <h2 className="text-lg sm:text-xl font-semibold mb-4">
              Заявки клиентов ({contacts.length})
            </h2>
            
            {contacts.length === 0 ? (
              <div className="text-center text-gray-500 py-12">
                <MessageSquare className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                <p className="text-sm sm:text-base">Нет заявок</p>
              </div>
            ) : (
              <div className="space-y-4">
                {contacts.map((contact) => (
                  <div key={contact.id} className="bg-white rounded-lg shadow-md border-2 border-gray-200 p-4 sm:p-6">
                    <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                      <div className="flex-1">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-3">
                          <div className="flex items-center gap-2">
                            <User className="w-5 h-5 text-gray-500 flex-shrink-0" />
                            <span className="font-medium text-gray-900 truncate">{contact.name}</span>
                          </div>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium self-start sm:self-center ${
                            contact.status === 'new' 
                              ? 'bg-red-100 text-red-800' 
                              : contact.status === 'contacted'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-green-100 text-green-800'
                          }`}>
                            {contact.status === 'new' ? 'Новая' : 
                             contact.status === 'contacted' ? 'Связались' : 'Завершена'}
                          </span>
                        </div>
                        
                        <div className="flex items-center gap-2 mb-3">
                          <Phone className="w-4 h-4 text-gray-500 flex-shrink-0" />
                          <a 
                            href={`tel:${contact.phone}`}
                            className="text-blue-600 hover:text-blue-800 font-medium break-all"
                          >
                            {contact.phone}
                          </a>
                        </div>
                        
                        {contact.comment && (
                          <div className="mb-3">
                            <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg break-words">
                              {contact.comment}
                            </p>
                          </div>
                        )}
                        
                        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 text-xs text-gray-500">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4 flex-shrink-0" />
                            <span>Создана: {new Date(contact.created_at).toLocaleString('ru-RU')}</span>
                          </div>
                          {contact.updated_at !== contact.created_at && (
                            <>
                              <span className="hidden sm:inline">•</span>
                              <span>Обновлена: {new Date(contact.updated_at).toLocaleString('ru-RU')}</span>
                            </>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex flex-col sm:flex-col gap-2 sm:min-w-[200px]">
                        {contact.status === 'new' && (
                          <>
                            <button
                              onClick={() => updateContactStatus(contact.id, 'contacted')}
                              className="w-full px-3 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 active:bg-yellow-800 transition-colors text-sm font-medium"
                            >
                              Отметить как связались
                            </button>
                            <button
                              onClick={() => updateContactStatus(contact.id, 'completed')}
                              className="w-full px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 active:bg-green-800 transition-colors text-sm font-medium"
                            >
                              Завершить
                            </button>
                          </>
                        )}
                        {contact.status === 'contacted' && (
                          <button
                            onClick={() => updateContactStatus(contact.id, 'completed')}
                            className="w-full px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 active:bg-green-800 transition-colors text-sm font-medium"
                          >
                            Завершить
                          </button>
                        )}
                        <button
                          onClick={() => deleteContact(contact.id)}
                          className="w-full px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 active:bg-red-800 transition-colors text-sm font-medium"
                        >
                          Удалить
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}