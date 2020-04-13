window.addEventListener("load", function(){
	document.getElementById("modal-dark").onclick = function()
	{
		Modal.QuickClose();
	};
});

class Modal {
	// modalID											The Id of the modal.
	// config												The config for the modal.
	//	toggle element							The element used to toggle the visibility of this modal.
	//	timeout								0			Seconds to wait to close the modal from inactivity (0 for none)
	//	visible								False	The default visibility state
	//	quick close						True	Should this modal close quickly?

	quickClose = true;

	constructor(modalId, config)
	{
		this.modalElement = document.getElementById(modalId);

		var modal = this;

		if(config["visible"] !== undefined)
		{
			this.isVisible = !config["visible"];
			this.SetVisible(config["visible"]);
		}
		else
		{
			this.isVisible = true;
			this.SetVisible(false);
		}

		if(config["quick close"] === false)
			this.quickClose = false

		if(config["toggle element"])
			config["toggle element"].onclick = function() { modal.ToggleVisible(); };

	}

	SetVisible(value)
	{
		// Exit out early if the value has not changed.
		if(value == this.isVisible)
			return;
		
		if(value)
		{
			console.log(`Showing the ${this.modalElement.id} modal`);
			Modal.modalOpened(this);
			this.ResetTimeout();
		}
		else
		{
			console.log(`Hiding the ${this.modalElement.id} modal`);
			Modal.modalClosed(this);
		}
		this.modalElement.hidden = !value
		this.isVisible = value;
	}
	ToggleVisible()
	{
		this.SetVisible(!this.isVisible);
	}

	ResetTimeout()
	{
		
	}

	static modalOpened(modal)
	{
		Modal.openModals.push(modal);

		if(Modal.openModals.length > 0)
			document.getElementById("modal-dark").hidden = false;
	}

	static modalClosed(modal)
	{
		const index = Modal.openModals.indexOf(modal);
		
		if(index > -1)
			Modal.openModals.splice(index, 1);

		if(Modal.openModals.length == 0)
			document.getElementById("modal-dark").hidden = true;
	}

	static QuickClose()
	{
		// Copy the openModals array and close each modal that's got quickClose set.
		const modals = Modal.openModals.slice();
		modals.forEach(modal =>
		{
			if(modal.quickClose)
				modal.SetVisible(false);
		});
	}
}
Modal.openModals = [];