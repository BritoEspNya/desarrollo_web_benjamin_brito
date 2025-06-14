const commentButtons = document.querySelectorAll('.comment-btn');

commentButtons.forEach(button => {
    button.addEventListener('click', function(click) {
        const clickedButton = click.target;
        const actDiv = clickedButton.closest('.act-div');
        const commentDiv = document.createElement('div');
        commentDiv.style.display = "block";

        // 1. Crear el elemento <form>
        const commentForm = document.createElement('form');
        commentForm.method = 'POST';
        commentForm.action = "/post-comment";
        commentForm.classList.add('comment-form-container');

        // 2. Campo para el Nombre
        const groupNombre = document.createElement('div');
        groupNombre.classList.add('comment-form-group');
        const labelNombre = document.createElement('label');
        labelNombre.htmlFor = 'nombreUsuario';
        labelNombre.textContent = 'Nombre:';
        const inputNombre = document.createElement('input');
        inputNombre.type = 'text';
        inputNombre.name = 'nombreUsuario';
        inputNombre.placeholder = 'Introduce tu nombre';
        inputNombre.required = true; // Obligatorio
        inputNombre.minLength = 3;   // Largo mínimo 3
        inputNombre.maxLength = 80;  // Largo máximo 80

        
        const nombreError = document.createElement('p');
        nombreError.id = 'nombreError';
        nombreError.classList.add('error-message');
        nombreError.textContent = 'El nombre es obligatorio y debe tener entre 3 y 80 caracteres.';
        nombreError.style.display = "none";
        

        groupNombre.appendChild(labelNombre);
        groupNombre.appendChild(inputNombre);
        groupNombre.appendChild(nombreError); 
        commentForm.appendChild(groupNombre);

        const groupComentario = document.createElement('div');
        groupComentario.classList.add('comment-form-group');
        const labelComentario = document.createElement('label');
        labelComentario.textContent = 'Comentario:';
        const textareaComentario = document.createElement('textarea');
        textareaComentario.name = 'textoComentario';
        textareaComentario.rows = 4; // 4 filas
        textareaComentario.cols = 50; // 50 columnas 
        textareaComentario.placeholder = 'Escribe tu comentario aquí...';
        textareaComentario.required = true; // Obligatorio
        textareaComentario.minLength = 5;   // Largo mínimo 5

        const comentarioError = document.createElement('p');
        comentarioError.id = 'comentarioError';
        comentarioError.classList.add('error-message');
        comentarioError.textContent = 'El comentario es obligatorio y debe tener al menos 5 caracteres.';
        comentarioError.style.display = "none";
        

        groupComentario.appendChild(labelComentario);
        groupComentario.appendChild(textareaComentario);
        groupComentario.appendChild(comentarioError); 
        commentForm.appendChild(groupComentario);

        let actividadId = document.createElement("input");
        actividadId.type = "hidden";
        actividadId.name = "comment-act-id";
        actividadId.value = actDiv.dataset.actId;
        commentForm.appendChild(actividadId);

        const submitButton = document.createElement('button');
        submitButton.type = 'submit';
        submitButton.textContent = 'Enviar';
        commentForm.appendChild(submitButton);

        commentDiv.appendChild(commentForm);

        actDiv.appendChild(commentDiv);

        commentForm.addEventListener('submit', function(event) {
            event.preventDefault();

            const isNombreValid = inputNombre.checkValidity();
            const isComentarioValid = textareaComentario.checkValidity();
            
            nombreError.style.display = isNombreValid ? 'none' : 'block';
            comentarioError.style.display = isComentarioValid ? 'none' : 'block';
            
            if (isNombreValid && isComentarioValid) {
                commentForm.submit()
            } else {
                alert('Por favor, completa correctamente todos los campos del formulario.');
            }
        })
    })
})