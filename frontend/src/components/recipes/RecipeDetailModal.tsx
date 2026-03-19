import React from 'react';
import type { RecipeWithIngredients } from '../../types/recipe';
import type { Ingredient } from '../../types/ingredient';
import { 
  XMarkIcon, 
  ClockIcon, 
  ChartBarIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
  FireIcon
} from '@heroicons/react/24/outline';

interface RecipeDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  recipe: RecipeWithIngredients | null;
  userIngredients: Ingredient[];
  onCook: (id: number) => void;
}

const RecipeDetailModal: React.FC<RecipeDetailModalProps> = ({ 
  isOpen, 
  onClose, 
  recipe, 
  userIngredients,
  onCook 
}) => {
  if (!isOpen || !recipe) return null;

  // 사용자가 보유한 재료 ID 목록 (간단한 체크용)
  const possessedIds = new Set(userIngredients.map(i => i.id));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white dark:bg-slate-800 w-full max-w-2xl rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
        {/* Header */}
        <div className="relative h-48 bg-gradient-to-br from-brand-500 to-brand-700 p-8 flex flex-col justify-end">
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 p-2 bg-white dark:bg-slate-800/20 hover:bg-white dark:bg-slate-800/30 rounded-full text-white transition-colors"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
          <div className="space-y-2">
            <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-white dark:bg-slate-800/20 text-white`}>
              {recipe.difficulty === 'EASY' ? '쉬움' : recipe.difficulty === 'MEDIUM' ? '보통' : '어려움'}
            </span>
            <h2 className="text-3xl font-black text-white leading-tight">{recipe.title}</h2>
          </div>
        </div>

        {/* Content */}
        <div className="p-8 space-y-8 max-h-[60vh] overflow-y-auto custom-scrollbar">
          {/* Quick Stats */}
          <div className="flex gap-6 pb-6 border-b border-gray-100 dark:border-slate-700">
            <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 font-bold">
              <ClockIcon className="w-5 h-5 text-brand-500" />
              <span>{recipe.cookingTime || 0}분 소요</span>
            </div>
            <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 font-bold">
              <ChartBarIcon className="w-5 h-5 text-brand-500" />
              <span>재료 {recipe.ingredients.length}개</span>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-3">
            <h3 className="text-lg font-black text-gray-900 dark:text-white flex items-center gap-2">
              <div className="w-1.5 h-6 bg-brand-500 rounded-full" />
              레시피 설명
            </h3>
            <p className="text-gray-600 leading-relaxed font-medium">
              {recipe.description || '설명이 등록되지 않은 레시피입니다.'}
            </p>
          </div>

          {/* Ingredients */}
          <div className="space-y-4">
            <h3 className="text-lg font-black text-gray-900 dark:text-white flex items-center gap-2">
              <div className="w-1.5 h-6 bg-brand-500 rounded-full" />
              필요한 식재료
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {recipe.ingredients.map((ri) => {
                const isPossessed = possessedIds.has(ri.ingredient_id);
                return (
                  <div key={ri.id} className={`flex items-center justify-between p-4 rounded-2xl border transition-all ${
                    isPossessed ? 'bg-emerald-50/50 border-emerald-100' : 'bg-gray-50 dark:bg-slate-900 border-gray-100 dark:border-slate-700'
                  }`}>
                    <div className="flex items-center gap-3">
                      {isPossessed ? (
                        <CheckCircleIcon className="w-5 h-5 text-emerald-500" />
                      ) : (
                        <ExclamationCircleIcon className="w-5 h-5 text-gray-300" />
                      )}
                      <div>
                        <p className={`font-bold ${isPossessed ? 'text-emerald-900' : 'text-gray-900 dark:text-white'}`}>
                          {ri.ingredient.name}
                        </p>
                        <p className="text-xs text-gray-400 font-medium">{ri.amount}</p>
                      </div>
                    </div>
                    {!isPossessed && <span className="text-[10px] font-black text-rose-500 bg-rose-50 px-2 py-1 rounded-lg">부족</span>}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Instructions */}
          <div className="space-y-4">
            <h3 className="text-lg font-black text-gray-900 dark:text-white flex items-center gap-2">
              <div className="w-1.5 h-6 bg-brand-500 rounded-full" />
              조리 방법
            </h3>
            <div className="bg-gray-50 dark:bg-slate-900 p-6 rounded-3xl border border-gray-100 dark:border-slate-700">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap font-medium">
                {recipe.instructions || '조리 방법이 등록되지 않았습니다.'}
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-8 bg-gray-50 dark:bg-slate-900/50 border-t border-gray-100 dark:border-slate-700">
          <button 
            onClick={() => onCook(recipe.id)}
            className="w-full flex items-center justify-center gap-3 bg-brand-600 text-white py-5 rounded-2xl font-black text-lg hover:bg-brand-700 hover:shadow-xl hover:shadow-brand-200 transition-all active:scale-[0.98] group"
          >
            <FireIcon className="w-6 h-6 animate-pulse" />
            지금 요리 시작하기 (재고 차감)
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetailModal;
