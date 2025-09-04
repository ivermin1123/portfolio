"use client";
import { useState } from "react";

import { AnimatePresence, motion } from "framer-motion";
import { Globe } from "lucide-react";

import { useLocale } from "@/components/providers/LocaleProvider";
import { Button } from "@/components/ui/button";


export default function LocaleSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const { currentLocale, setCurrentLocale, locales } = useLocale();

  const handleLocaleChange = (locale: (typeof locales)[0]) => {
    setCurrentLocale(locale);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="relative h-9 w-9 p-0 overflow-hidden group text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400"
        aria-label="Change language"
      >
        <Globe className="h-4 w-4" />

        {/* Current locale indicator */}
        <div className="absolute -top-1 -right-1 w-2 h-2 bg-blue-500 rounded-full opacity-80" />

        {/* Hover effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-md opacity-0"
          animate={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        />
      </Button>

      {/* Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 z-40 bg-black/20 dark:bg-black/40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            {/* Dropdown menu */}
            <motion.div
              className="absolute right-0 top-full mt-2 w-48 rounded-lg border border-gray-200/50 dark:border-white/10 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl shadow-xl z-50 ring-1 ring-gray-200/20 dark:ring-white/10"
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="p-2">
                {locales.map((locale, index) => (
                  <motion.button
                    key={locale.code}
                    className={`w-full flex items-center gap-3 rounded-md px-3 py-2 text-sm text-left transition-colors ${
                      currentLocale.code === locale.code
                        ? "bg-blue-500/10 text-blue-600 dark:text-blue-400 dark:bg-blue-500/20"
                        : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-800"
                    }`}
                    onClick={() => handleLocaleChange(locale)}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: index * 0.05,
                      duration: 0.2,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    <span className="text-lg">{locale.flag}</span>
                    <span className="font-medium">{locale.name}</span>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
