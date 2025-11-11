'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Modal from './Modal';
import { Command } from 'lucide-react';

export default function KeyboardShortcuts() {
  const router = useRouter();
  const [showHelp, setShowHelp] = useState(false);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Command/Ctrl + K - Show help
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setShowHelp(true);
      }

      // Command/Ctrl + U - Upload receipt
      if ((e.metaKey || e.ctrlKey) && e.key === 'u') {
        e.preventDefault();
        router.push('/dashboard');
      }

      // Command/Ctrl + L - Library
      if ((e.metaKey || e.ctrlKey) && e.key === 'l') {
        e.preventDefault();
        router.push('/library');
      }

      // Command/Ctrl + , - Settings
      if ((e.metaKey || e.ctrlKey) && e.key === ',') {
        e.preventDefault();
        router.push('/settings');
      }

      // Escape - Close modals
      if (e.key === 'Escape' && showHelp) {
        setShowHelp(false);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [router, showHelp]);

  const shortcuts = [
    { keys: ['⌘', 'K'], description: 'Show keyboard shortcuts' },
    { keys: ['⌘', 'U'], description: 'Upload receipt' },
    { keys: ['⌘', 'L'], description: 'Go to library' },
    { keys: ['⌘', ','], description: 'Open settings' },
    { keys: ['ESC'], description: 'Close modal' },
  ];

  return (
    <>
      {/* Help button */}
      <button
        onClick={() => setShowHelp(true)}
        className="fixed bottom-6 right-6 p-3 bg-emerald-600 text-white rounded-full shadow-lg hover:shadow-xl hover:bg-emerald-700 transition-all z-40"
        title="Keyboard shortcuts (⌘K)"
      >
        <Command className="w-6 h-6" />
      </button>

      {/* Help modal */}
      <Modal
        isOpen={showHelp}
        onClose={() => setShowHelp(false)}
        title="Keyboard Shortcuts"
      >
        <div className="space-y-4">
          {shortcuts.map((shortcut, i) => (
            <div key={i} className="flex items-center justify-between py-3 border-b border-gray-200 last:border-0">
              <span className="text-gray-700">{shortcut.description}</span>
              <div className="flex items-center gap-1">
                {shortcut.keys.map((key, j) => (
                  <kbd
                    key={j}
                    className="px-3 py-1 bg-gray-100 border border-gray-300 rounded text-sm font-mono"
                  >
                    {key}
                  </kbd>
                ))}
              </div>
            </div>
          ))}
        </div>
        <p className="text-sm text-gray-500 mt-6 text-center">
          Press <kbd className="px-2 py-1 bg-gray-100 border border-gray-300 rounded text-xs">⌘K</kbd> anytime to see this menu
        </p>
      </Modal>
    </>
  );
}
