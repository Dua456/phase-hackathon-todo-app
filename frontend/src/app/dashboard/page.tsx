'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { TaskCard } from '@/components/TaskCard';
import { AddTaskModal } from '@/components/AddTaskModal';
import { Header } from '@/components/Header';
import { Task } from '@/types/task';
import { useAuth } from '@/contexts/AuthContext';
import { ProtectedRoute } from '@/components/ProtectedRoute';

export default function DashboardPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { user, loading: authLoading, logout } = useAuth();

  // Check for token on component mount
  useEffect(() => {
    if (!authLoading && user) {
      fetchTasks();
    }
  }, [user, authLoading, router]);

  // Filter and search tasks
  useEffect(() => {
    let result = tasks;

    // Apply filter
    if (filter === 'active') {
      result = result.filter(task => !task.completed);
    } else if (filter === 'completed') {
      result = result.filter(task => task.completed);
    }

    // Apply search
    if (searchQuery) {
      result = result.filter(task =>
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    setFilteredTasks(result);
  }, [tasks, filter, searchQuery]);

  const fetchTasks = async () => {
    try {
      if (!user) {
        router.push('/login');
        return;
      }

      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/login');
        return;
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/tasks`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setTasks(data);
      } else if (response.status === 401) {
        logout();
      }
    } catch (error) {
      console.error('Error fetching tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleTaskCreated = (newTask: Task) => {
    setTasks(prev => [newTask, ...prev]);
    setIsModalOpen(false);
  };

  const handleTaskUpdated = (updatedTask: Task) => {
    setTasks(prev => prev.map(task => task.id === updatedTask.id ? updatedTask : task));
  };

  const handleTaskDeleted = (taskId: string) => {
    setTasks(prev => prev.filter(task => task.id !== taskId));
  };

  const handleToggleComplete = async (taskId: string) => {
    try {
      if (!user) return;

      const token = localStorage.getItem('token');
      if (!token) return;

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/tasks/${taskId}/complete`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const updatedTask = await response.json();
        setTasks(prev => prev.map(task =>
          task.id === taskId ? { ...task, completed: updatedTask.completed } : task
        ));
      } else if (response.status === 401) {
        logout();
      }
    } catch (error) {
      console.error('Error toggling task completion:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800">
        <Header />

        <div className="container mx-auto px-4 py-8 max-w-6xl">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-6">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">My Tasks</h1>
              <p className="text-gray-300 text-lg">Manage your tasks efficiently</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search tasks..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full sm:w-72 px-5 py-3 bg-white/15 backdrop-blur-sm border border-white/25 rounded-xl text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all shadow-lg"
                />
                <svg
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setFilter('all')}
                  className={`px-5 py-3 rounded-xl transition-all font-medium ${
                    filter === 'all'
                      ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg'
                      : 'bg-white/15 text-gray-300 hover:bg-white/25 border border-white/20'
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setFilter('active')}
                  className={`px-5 py-3 rounded-xl transition-all font-medium ${
                    filter === 'active'
                      ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg'
                      : 'bg-white/15 text-gray-300 hover:bg-white/25 border border-white/20'
                  }`}
                >
                  Active
                </button>
                <button
                  onClick={() => setFilter('completed')}
                  className={`px-5 py-3 rounded-xl transition-all font-medium ${
                    filter === 'completed'
                      ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg'
                      : 'bg-white/15 text-gray-300 hover:bg-white/25 border border-white/20'
                  }`}
                >
                  Completed
                </button>
              </div>
            </div>
          </div>

          {filteredTasks.length === 0 ? (
            <div className="text-center py-20 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 shadow-xl">
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 flex items-center justify-center">
                  <svg
                    className="w-10 h-10 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                    />
                  </svg>
                </div>
              </div>
              <div className="text-white text-2xl font-semibold mb-3">No tasks found</div>
              <p className="text-gray-400 mb-8 max-w-md mx-auto">
                {searchQuery
                  ? 'No tasks match your search. Try different keywords.'
                  : filter === 'completed'
                    ? 'No completed tasks yet. Keep working on your active tasks!'
                    : filter === 'active'
                      ? 'No active tasks. Add a new task to get started!'
                      : 'Add your first task to get started and organize your work!'}
              </p>
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-purple-700 hover:to-indigo-700 transition-all shadow-xl hover:shadow-2xl transform hover:-translate-y-0.5"
              >
                Add New Task
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
              {filteredTasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onToggleComplete={handleToggleComplete}
                  onEdit={handleTaskUpdated}
                  onDelete={handleTaskDeleted}
                />
              ))}
            </div>
          )}

          <button
            onClick={() => setIsModalOpen(true)}
            className="fixed bottom-8 right-8 w-18 h-18 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-full flex items-center justify-center text-3xl shadow-2xl hover:from-purple-700 hover:to-indigo-700 transition-all transform hover:scale-110 z-10 border-4 border-white/20"
          >
            +
          </button>

          <AddTaskModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onTaskCreated={handleTaskCreated}
          />
        </div>
      </div>
    </ProtectedRoute>
  );
}