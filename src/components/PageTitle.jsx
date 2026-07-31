function PageTitle({ title, subtitle }) {
  return (
    <div className="mb-6">
      <h1 className="text-3xl font-bold text-slate-800">
        {title}
      </h1>

      {subtitle && (
        <p className="mt-1 text-slate-500">
          {subtitle}
        </p>
      )}
    </div>
  );
}

export default PageTitle;