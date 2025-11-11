'use client';

import { useState, useEffect } from 'react';
import Modal from './Modal';
import Button from './Button';
import { CheckCircle, Upload, FileSpreadsheet, Sparkles } from 'lucide-react';

export default function WelcomeModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(0);

  useEffect(() => {
    // Check if user has seen welcome modal
    const hasSeenWelcome = localStorage.getItem('hasSeenWelcome');
    if (!hasSeenWelcome) {
      setIsOpen(true);
    }
  }, []);

  const handleClose = () => {
    localStorage.setItem('hasSeenWelcome', 'true');
    setIsOpen(false);
  };

  const steps = [
    {
      title: 'Welcome to ReceiptBox!',
      description: 'Track every purchase. Household, business, life.',
      icon: <CheckCircle className="w-16 h-16 text-emerald-600" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-600 text-lg">
            ReceiptBox helps you organize receipts and track spending without manual data entry.
          </p>
          <p className="text-gray-600">
            Let's get you started in 3 simple steps.
          </p>
        </div>
      ),
    },
    {
      title: 'Upload Your Receipts',
      description: 'Drag, drop, or click to upload',
      icon: <Upload className="w-16 h-16 text-emerald-600" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-600">
            Upload receipts from your computer or phone. We support:
          </p>
          <ul className="space-y-2 text-gray-600">
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
              <span>Photos (JPG, PNG, HEIC)</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
              <span>PDFs (up to 10MB)</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
              <span>Mobile camera capture</span>
            </li>
          </ul>
        </div>
      ),
    },
    {
      title: 'AI Extracts the Data',
      description: 'No manual entry required',
      icon: <Sparkles className="w-16 h-16 text-emerald-600" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-600">
            Our AI automatically extracts:
          </p>
          <ul className="space-y-2 text-gray-600">
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
              <span>Vendor name</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
              <span>Amount and tax</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
              <span>Date and payment method</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
              <span>Auto-categorization</span>
            </li>
          </ul>
          <p className="text-sm text-gray-500 mt-4">
            You can always review and edit before saving.
          </p>
        </div>
      ),
    },
    {
      title: 'Connect Google Sheets',
      description: 'Your data, your control',
      icon: <FileSpreadsheet className="w-16 h-16 text-emerald-600" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-600">
            Your Google Sheet IS your database. We just make it easy to fill.
          </p>
          <p className="text-gray-600">
            Choose from pre-built templates or connect your own sheet:
          </p>
          <ul className="space-y-2 text-gray-600 mt-4">
            <li className="flex items-start gap-2">
              <span className="font-medium">•</span>
              <span>Business Expenses (tax tracking)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-medium">•</span>
              <span>Household Budget (family tracking)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-medium">•</span>
              <span>Homestead Tracker (ROI tracking)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-medium">•</span>
              <span>Personal Finance (net worth)</span>
            </li>
          </ul>
        </div>
      ),
    },
  ];

  const currentStep = steps[step];

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title=""
      footer={
        <>
          {step > 0 && (
            <Button variant="ghost" onClick={() => setStep(step - 1)}>
              Back
            </Button>
          )}
          {step < steps.length - 1 ? (
            <Button onClick={() => setStep(step + 1)}>
              Next
            </Button>
          ) : (
            <Button onClick={handleClose}>
              Get Started
            </Button>
          )}
        </>
      }
    >
      <div className="text-center">
        <div className="flex justify-center mb-6">
          {currentStep.icon}
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          {currentStep.title}
        </h2>
        <p className="text-lg text-gray-600 mb-8">
          {currentStep.description}
        </p>
        <div className="text-left max-w-md mx-auto">
          {currentStep.content}
        </div>

        {/* Progress dots */}
        <div className="flex justify-center gap-2 mt-8">
          {steps.map((_, i) => (
            <button
              key={i}
              onClick={() => setStep(i)}
              className={`w-2 h-2 rounded-full transition-all ${
                i === step
                  ? 'bg-emerald-600 w-8'
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>
      </div>
    </Modal>
  );
}
