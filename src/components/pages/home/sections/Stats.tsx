const Stats = () => {
  return (
    <section className="py-16 bg-white dark:bg-gray-950">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="space-y-2">
            <p className="text-4xl font-bold text-orange-600 dark:text-orange-500">
              +5,000
            </p>
            <p className="text-gray-600 dark:text-gray-400">Usuarios activos</p>
          </div>
          <div className="space-y-2">
            <p className="text-4xl font-bold text-orange-600 dark:text-orange-500">
              +200
            </p>
            <p className="text-gray-600 dark:text-gray-400">Especialistas</p>
          </div>
          <div className="space-y-2">
            <p className="text-4xl font-bold text-orange-600 dark:text-orange-500">
              +50
            </p>
            <p className="text-gray-600 dark:text-gray-400">Centros médicos</p>
          </div>
          <div className="space-y-2">
            <p className="text-4xl font-bold text-orange-600 dark:text-orange-500">
              +1,000
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              Recursos verificados
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stats;
