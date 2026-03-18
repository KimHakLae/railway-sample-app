import { useEffect, useState } from 'react';
import type { Ingredient } from '../../types/ingredient';
import type { RecipeWithIngredients, Difficulty } from '../../types/recipe';
import { XMarkIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
  ingredients: Ingredient[];
  initialData?: RecipeWithIngredients;
}

export default function RecipeModal({ isOpen, onClose, onSave, ingredients, initialData }: Props) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [instructions, setInstructions] = useState('');
  const [difficulty, setDifficulty] = useState<Difficulty>('MEDIUM');
  const [cookingTime, setCookingTime] = useState(30);
  const [selectedIngredients, setSelectedIngredients] = useState<{ ingredientId: number; amount: string }[]>([]);

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setDescription(initialData.description || '');
      setInstructions(initialData.instructions || '');
      setDifficulty(initialData.difficulty);
      setCookingTime(initialData.cookingTime || 30);
      setSelectedIngredients(initialData.ingredients.map(ing => ({
        ingredientId: ing.ingredient_id,
        amount: ing.amount
      })));
    } else {
      resetForm();
    }
  }, [initialData, isOpen]);

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setInstructions('');
    setDifficulty('MEDIUM');
    setCookingTime(30);
    setSelectedIngredients([]);
  };

  const addIngredient = () => {
    if (ingredients.length > 0) {
      setSelectedIngredients([...selectedIngredients, { ingredientId: ingredients[0].id, amount: '' }]);
    }
  };

  const removeIngredient = (index: number) => {
    setSelectedIngredients(selectedIngredients.filter((_, i) => i !== index));
  };

  const handleIngredientChange = (index: number, field: string, value: any) => {
    const updated = [...selectedIngredients];
    updated[index] = { ...updated[index], [field]: value };
    setSelectedIngredients(updated);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-300">
        <div className="p-8 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
          <div>
            <h2 className="text-2xl font-black text-gray-900">{initialData ? '레시피 수정' : '새 레시피 등록'}</h2>
            <p className="text-sm font-medium text-gray-500">요리법과 필요한 재료를 입력하세요.</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white rounded-xl transition-colors text-gray-400 hover:text-gray-900 shadow-sm border border-transparent hover:border-gray-100">
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        <div className="p-8 overflow-y-auto space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-black text-gray-700 uppercase tracking-wider ml-1">레시피 제목</label>
            <input 
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="예: 김치볶음밥, 봉골레 파스타"
              className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-brand-500/10 focus:border-brand-500 transition-all font-bold placeholder:text-gray-300"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-black text-gray-700 uppercase tracking-wider ml-1">난이도</label>
              <select 
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value as Difficulty)}
                className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-brand-500/10 focus:border-brand-500 transition-all font-bold"
              >
                <option value="EASY">쉬움</option>
                <option value="MEDIUM">보통</option>
                <option value="HARD">어려움</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-black text-gray-700 uppercase tracking-wider ml-1">조리 시간 (분)</label>
              <input 
                type="number"
                value={cookingTime}
                onChange={(e) => setCookingTime(Number(e.target.value))}
                className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-brand-500/10 focus:border-brand-500 transition-all font-bold"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-black text-gray-700 uppercase tracking-wider ml-1">간단 설명</label>
            <textarea 
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="레시피에 대한 짤막한 소개..."
              rows={2}
              className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-brand-500/10 focus:border-brand-500 transition-all font-medium resize-none"
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between bg-brand-50/50 p-3 rounded-2xl border border-brand-100">
              <label className="text-sm font-black text-brand-700 uppercase tracking-wider ml-1">필요 재료 목록</label>
              <button 
                onClick={addIngredient}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-brand-600 text-white text-xs font-black rounded-xl hover:bg-brand-700 transition-all active:scale-95 shadow-sm shadow-brand-100"
              >
                <PlusIcon className="w-4 h-4" /> 재료 추가하기
              </button>
            </div>
            
            <div className="space-y-3">
              {selectedIngredients.length === 0 ? (
                <div className="text-center py-8 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-100">
                  <p className="text-sm font-bold text-gray-400">등록된 재료가 없습니다. 상단 버튼을 눌러 추가하세요.</p>
                </div>
              ) : selectedIngredients.map((item, index) => (
                <div key={index} className="flex gap-3 animate-in slide-in-from-right-4 duration-300 items-center">
                  <div className="flex-1">
                    <select 
                      value={item.ingredientId}
                      onChange={(e) => handleIngredientChange(index, 'ingredientId', Number(e.target.value))}
                      className="w-full px-4 py-3 bg-white border border-gray-100 rounded-xl font-bold text-sm focus:ring-4 focus:ring-brand-500/10 focus:border-brand-500"
                    >
                      <option value="" disabled>식재료 선택</option>
                      {ingredients.map(ing => (
                        <option key={ing.id} value={ing.id}>{ing.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="w-32">
                    <input 
                      type="text"
                      placeholder="수량 (예: 200g)"
                      value={item.amount}
                      onChange={(e) => handleIngredientChange(index, 'amount', e.target.value)}
                      className="w-full px-4 py-3 bg-white border border-gray-100 rounded-xl font-bold text-sm focus:ring-4 focus:ring-brand-500/10 focus:border-brand-500"
                    />
                  </div>
                  <button 
                    onClick={() => removeIngredient(index)}
                    className="p-3 text-gray-300 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all"
                  >
                    <TrashIcon className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-black text-gray-700 uppercase tracking-wider ml-1">상세 조리법</label>
            <textarea 
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              placeholder="1. 재료를 손질합니다.
2. 냄비에 물을 붓고..."
              rows={5}
              className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-brand-500/10 focus:border-brand-500 transition-all font-medium"
            />
          </div>
        </div>

        <div className="p-8 bg-gray-50/50 border-t border-gray-100 flex gap-4">
          <button 
            onClick={onClose}
            className="flex-1 py-4 bg-white border border-gray-200 text-gray-500 font-black rounded-2xl hover:bg-gray-50 transition-all"
          >
            취소
          </button>
          <button 
            onClick={() => onSave({ title, description, instructions, difficulty, cookingTime, ingredients: selectedIngredients })}
            className="flex-1 py-4 bg-brand-600 text-white font-black rounded-2xl hover:bg-brand-700 shadow-lg shadow-brand-200 transition-all active:scale-[0.98]"
          >
            저장하기
          </button>
        </div>
      </div>
    </div>
  );
}
