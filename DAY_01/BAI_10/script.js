let listItem = document.querySelectorAll(".item");

listItem.forEach((item, index) => {
	item.innerHTML = "Updated item " + (index + 1);
});
