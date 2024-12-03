/*------------SELECCIONAR TARJETAS-----------*/
document.addEventListener("DOMContentLoaded", () => {
    const contenedorCards = document.querySelector(".card-container");
    const tarjetasGuardadas = JSON.parse(localStorage.getItem("recetas")) || [];
  
    /*-------------CARGAR LOCAL STORAGE-----------*/
    tarjetasGuardadas.forEach((tarjeta) => crearCard(tarjeta));
  
    /*-----------PREVISUALISAR IMAGEN---------*/
    window.previewImage = (event) => {
      const reader = new FileReader();
      reader.onload = () => {
        const preview = document.getElementById("preview");
        preview.src = reader.result;
        preview.style.display = "block";
      };
      reader.readAsDataURL(event.target.files[0]);
    };
  
    /*--------GUARDAR DATOS-----------*/ 
    window.Guardar = () => {
      const consecutivo = document.getElementById("consecutivo").value.trim();
      const nombreReceta = document.getElementById("nombreReceta").value.trim();
      const descripcion = document.getElementById("descripcion").value.trim();
      const precioFabricacion = document.getElementById("precioFabricacion").value.trim();
      const precioVenta = document.getElementById("precioVenta").value.trim();
      const preview = document.getElementById("preview").src;
  
      if (nombreReceta && consecutivo && descripcion && precioFabricacion && precioVenta && preview) {
        const nuevaReceta = { 
          nombre: nombreReceta,
          consecutivo, 
          descripcion, 
          fabricacion: precioFabricacion, 
          venta: precioVenta, 
          imagen: preview 
        };
  
        crearCard(nuevaReceta);
  
        /*-----ALMACENAR EN LOCALSTORAGE-------*/
        tarjetasGuardadas.push(nuevaReceta);
        localStorage.setItem("recetas", JSON.stringify(tarjetasGuardadas));
  
        // Limpiar formulario y cerrar modal
        document.querySelector("#exampleModal form").reset();
        document.getElementById("preview").style.display = "none";
        const modal = bootstrap.Modal.getInstance(document.getElementById("exampleModal"));
        modal.hide();
  
        /*---------ALERTA EXITO-----------*/
        Swal.fire({
          title: '¡Receta guardada!',
          text: 'Tu receta se ha guardado correctamente.',
          icon: 'success',
          confirmButtonText: 'OK'
        });
  
      } else {
        /*---------ALERTA ERROR------------*/
        Swal.fire({
          title: '¡Error!',
          text: 'Por favor completa todos los campos, incluyendo la imagen.',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    };
  
/*----------CREAR CARD---------*/
    function crearCard({ nombre, consecutivo, descripcion, fabricacion, venta, imagen }) {
      const cardHTML = `
        <div class="card mb-3 mt-5" style="max-width: 540px;">
          <div class="row g-0">
            <div class="col-md-4 d-flex justify-content-center align-items-center">
              <img src="${imagen}" class="img-fluid rounded" alt="${nombre}">
            </div>
            <div class="col-md-8">
              <div class="card-body p-3">
                <h5 class="card-title">${nombre}</h5>
                <p class="card-text">Consecutivo:${consecutivo}</p>
                <p class="card-text">${descripcion}</p>
                <h5 class="card-title">Costo de fabricación</h5>
                <p class="card-text">$${fabricacion}</p>
                <h5 class="card-title">Valor de venta</h5>
                <p class="card-text">$${venta}</p>
              </div>
            </div>
          </div>
        </div>
      `;
      contenedorCards.insertAdjacentHTML("beforeend", cardHTML);
    }
  });
  