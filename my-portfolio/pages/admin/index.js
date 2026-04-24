import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTheme } from '../../context/ThemeContext';
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const SortableItem = ({ item, type, titleKey, editPathPrefix, handleDelete, isDarkMode, router }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: item._id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 10 : 0,
    position: 'relative'
  };

  return (
    <tr 
      ref={setNodeRef} 
      style={style} 
      className={`transition-colors ${isDragging ? (isDarkMode ? 'bg-gray-700' : 'bg-gray-100') : (isDarkMode ? 'hover:bg-gray-700/30' : 'hover:bg-gray-50')}`}
    >
      <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-900'}`}>
        <div className="flex items-center gap-3">
          <button 
            {...attributes} 
            {...listeners} 
            className="cursor-grab active:cursor-grabbing p-1 text-gray-500 hover:text-cyan-500 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>
          {item[titleKey]}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <button 
          onClick={() => router.push(`${editPathPrefix}/${item._id}`)} 
          className="text-indigo-500 hover:text-indigo-400 mr-4 transition-colors p-2 rounded-lg hover:bg-indigo-500/10"
        >
          Edit
        </button>
        <button 
          onClick={() => handleDelete(item._id, type)} 
          className="text-red-500 hover:text-red-400 transition-colors p-2 rounded-lg hover:bg-red-500/10"
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default function AdminDashboard() {
  const [projects, setProjects] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [awards, setAwards] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isDarkMode } = useTheme();
  const router = useRouter();

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [projRes, certRes, awardRes] = await Promise.all([
          fetch('/api/projects'),
          fetch('/api/certificates'),
          fetch('/api/awards')
        ]);

        const [projData, certData, awardData] = await Promise.all([
          projRes.json(),
          certRes.json(),
          awardRes.json()
        ]);

        setProjects(projData);
        setCertificates(certData);
        setAwards(awardData);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id, type) => {
    if (confirm(`Are you sure you want to delete this ${type}?`)) {
      const endpoint = type === 'project' ? `/api/projects/${id}` : type === 'certificate' ? `/api/certificates/${id}` : `/api/awards/${id}`;
      const response = await fetch(endpoint, {
        method: 'DELETE',
      });
      if (response.ok) {
        if (type === 'project') setProjects(projects.filter((p) => p._id !== id));
        if (type === 'certificate') setCertificates(certificates.filter((c) => c._id !== id));
        if (type === 'award') setAwards(awards.filter((a) => a._id !== id));
      } else {
        alert(`Failed to delete ${type}.`);
      }
    }
  };

  const handleDragEnd = async (event, type, items, setItems) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      const oldIndex = items.findIndex((item) => item._id === active.id);
      const newIndex = items.findIndex((item) => item._id === over.id);

      const newOrder = arrayMove(items, oldIndex, newIndex);
      setItems(newOrder);

      try {
        const response = await fetch('/api/reorder', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            type,
            items: newOrder,
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to update order');
        }
      } catch (error) {
        console.error('Reorder error:', error);
        alert('Failed to save new order. Please refresh.');
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500"></div>
      </div>
    );
  }

  const Section = ({ title, items, setItems, type, color, addPath, editPathPrefix, titleKey }) => (
    <section className={`rounded-2xl shadow-xl overflow-hidden border ${isDarkMode ? 'bg-gray-800/50 border-gray-700' : 'bg-white border-gray-200'}`}>
      <div className={`px-6 py-4 flex justify-between items-center border-b ${isDarkMode ? 'border-gray-700 bg-gray-900/30' : 'border-gray-100 bg-gray-50'}`}>
        <h2 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{title}</h2>
        <Link href={addPath} className={`flex items-center gap-2 text-white font-bold py-2 px-4 rounded-xl transition-all hover:scale-105 active:scale-95 ${color}`}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Add New
        </Link>
      </div>
      <div className="overflow-x-auto">
        <DndContext 
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={(event) => handleDragEnd(event, type, items, setItems)}
        >
          <table className="min-w-full divide-y divide-gray-200">
            <thead className={isDarkMode ? 'bg-gray-900/50' : 'bg-gray-50'}>
              <tr>
                <th className={`px-6 py-3 text-left text-xs font-bold uppercase tracking-wider ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Title (Drag to reorder)</th>
                <th className={`px-6 py-3 text-right text-xs font-bold uppercase tracking-wider ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Actions</th>
              </tr>
            </thead>
            <tbody className={`divide-y ${isDarkMode ? 'divide-gray-700' : 'divide-gray-100'}`}>
              <SortableContext 
                items={items.map(i => i._id)}
                strategy={verticalListSortingStrategy}
              >
                {items.length > 0 ? items.map((item) => (
                  <SortableItem 
                    key={item._id} 
                    item={item} 
                    type={type} 
                    titleKey={titleKey} 
                    editPathPrefix={editPathPrefix} 
                    handleDelete={handleDelete} 
                    isDarkMode={isDarkMode} 
                    router={router}
                  />
                )) : (
                  <tr>
                    <td colSpan="2" className="px-6 py-8 text-center text-gray-500 italic">No {type}s found.</td>
                  </tr>
                )}
              </SortableContext>
            </tbody>
          </table>
        </DndContext>
      </div>
    </section>
  );

  return (
    <div className={`min-h-screen pt-24 pb-12 transition-colors duration-300 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="container mx-auto px-6 space-y-12 max-w-6xl">
        <div className="text-center">
          <h1 className={`text-4xl font-extrabold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Admin Dashboard</h1>
          <p className="text-gray-500">Manage your portfolio content from one place</p>
          <div className="w-20 h-1 bg-cyan-500 mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 gap-12">
          <Section 
            title="Projects" 
            items={projects} 
            setItems={setProjects}
            type="project" 
            color="bg-indigo-600 shadow-indigo-500/30" 
            addPath="/admin/add-project" 
            editPathPrefix="/admin/edit"
            titleKey="name"
          />

          <Section 
            title="Certificates" 
            items={certificates} 
            setItems={setCertificates}
            type="certificate" 
            color="bg-cyan-600 shadow-cyan-500/30" 
            addPath="/admin/add-certificate" 
            editPathPrefix="/admin/edit-certificate"
            titleKey="title"
          />

          <Section 
            title="Awards" 
            items={awards} 
            setItems={setAwards}
            type="award" 
            color="bg-amber-600 shadow-amber-500/30" 
            addPath="/admin/add-award" 
            editPathPrefix="/admin/edit-award"
            titleKey="title"
          />
        </div>
      </div>
    </div>
  );
}

