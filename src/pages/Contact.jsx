export default function Contact() {
  return (
    <div className="container mt-5">
      <h1 className="mb-4 text-danger"> Contacto</h1>
      <p className="lead">
        Si deseas más información sobre el proyecto o colaborar,  
        escríbenos a <strong>carlos.ruiz.l@tecsup.edu.pe</strong>.
      </p>
      <form className="mt-4">
        <div className="mb-3">
          <label className="form-label">Nombre</label>
          <input type="text" className="form-control" placeholder="Tu nombre" />
        </div>
        <div className="mb-3">
          <label className="form-label">Mensaje</label>
          <textarea className="form-control" rows="3" placeholder="Tu mensaje"></textarea>
        </div>
        <button type="button" className="btn btn-danger">Enviar</button>
      </form>
    </div>
  );
}
