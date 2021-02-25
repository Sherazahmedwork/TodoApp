const App = {
	init() {
        $(document).on('submit','.appForm',App.submitAppForm);
        $(document).on('click','.deleteItem--btn',App.deleteItem);
        $(document).on('click','.addItem--btn',App.addItem);
        $(document).on('click','.deleteRequest--btn',App.deleteRequest);
	},

    //todos
    deleteItem() {
        $(this).parent().parent().remove();
    },

    addItem(){
        $('.itemsContainer').append(`
            <div class="input-group mb-1 item">
              <input type="text" name="items[]" class="form-control form-control-sm" placeholder="Item name" >
              <div class="input-group-append">
                <button class="btn btn-outline-secondary btn-sm deleteItem--btn" type="button" >Delete</button>
              </div>
            </div>
        `);
    },
    //global functions
	loader() {
		return '<div class="text-center">  Loading..</div>';
    },

    submitAppForm() {
        event.preventDefault();
		let form = new FormData($('.appForm')[0]);
		let url  = $('.appForm').attr('action');
		let submitBtn = $('.appForm--submit');
		let responseBlock  = $('.appForm--response');
		responseBlock.html(`${App.loader()}`);
		submitBtn.prop('disabled',true);

		axios.post(url,form).then((response) => {
            responseBlock.html(`<div class="alert alert-info successResponse"> ${response.data.message}</div>`);
            if(response.data.url != undefined)
                window.location.href = response.data.url;
    		submitBtn.prop('disabled',false);
        }).catch((error,other) => {
			responseBlock.html('');
			submitBtn.prop('disabled',false);
            error.response.data.errors.map((err) => {
				responseBlock.append(`<div class="alert alert-danger">${err}</div>`) 
			})
        });
    },

    deleteRequest(){
        let route = event.target.getAttribute('data-url');
        let message = event.target.getAttribute('data-message')
        message = message == undefined ? 'Yes, delete it!': message;
        if(confirm(message)){
            axios.delete(route).then((response) => {
                location.reload();
            }).catch((error) => {
                console.error(error);
                alert("Error in deleting contact support");
            });
        }
    },
}
export default App;