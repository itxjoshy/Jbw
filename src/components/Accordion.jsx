import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function Accordion({ question, answer }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="accordion-item">
      <button className="accordion-trigger" onClick={() => setOpen((value) => !value)}>
        <span>{question}</span>
        <span>{open ? '−' : '+'}</span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            className="accordion-panel"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <p>{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Accordion;
