import { motion } from 'framer-motion';

function SectionFeature({ feature, reverse }) {
  const featureClasses = `feature-card feature-card--${feature.variant}`;

  return (
    <section className={`section-feature ${reverse ? 'section-feature--reverse' : ''}`}>
      <motion.div
        className="feature-copy"
        initial={{ opacity: 0, x: reverse ? 80 : -80 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
      >
        <h2>{feature.title}</h2>
        <p>{feature.description}</p>
      </motion.div>
      <motion.div
        className={featureClasses}
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
      >
        <div className="feature-visual" />
        <div className="feature-caption">{feature.title}</div>
      </motion.div>
    </section>
  );
}

export default SectionFeature;
