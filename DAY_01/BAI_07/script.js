let text = document.querySelectorAll("p");

//  thay đổi nội dung của tất cả thẻ p thành "Update paragraph"
for (let i = 0; i < text.length; i++) {
	text[i].textContent = "Update paragraph";
}
