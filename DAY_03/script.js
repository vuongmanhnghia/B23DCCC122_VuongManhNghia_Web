class Student {
	constructor(id, name, gender, dateOfBirth, address) {
		this.id = id;
		this.name = name;
		this.gender = gender;
		this.dateOfBirth = dateOfBirth;
		this.address = address;
	}
}

class StudentManager {
	constructor() {
		this.students = JSON.parse(localStorage.getItem("students")) || [];
	}

	addStudent(student) {
		this.students.push(student);
		this.saveToLocalStorage();
	}

	updateStudent(index, updatedStudent) {
		this.students[index] = updatedStudent;
		this.saveToLocalStorage();
	}

	deleteStudent(index) {
		this.students.splice(index, 1);
		this.saveToLocalStorage();
	}

	saveToLocalStorage() {
		localStorage.setItem("students", JSON.stringify(this.students));
	}

	displayStudents() {
		const tableBody = document.querySelector("#studentTable tbody");
		tableBody.innerHTML = "";
		this.students.forEach((student, index) => {
			const row = tableBody.insertRow();
			row.innerHTML = `
                        <td>${student.id}</td>
                        <td>${student.name}</td>
                        <td>${student.gender}</td>
                        <td>${student.dateOfBirth}</td>
                        <td>${student.address}</td>
                        <td class="action-buttons">
                            <button class="edit" onclick="editStudent(${index})">Sửa</button>
                            <button class="delete" onclick="deleteStudent(${index})">Xóa</button>
                        </td>
                    `;
		});
	}
}

const manager = new StudentManager();
manager.displayStudents();

document.getElementById("studentForm").addEventListener("submit", function (e) {
	e.preventDefault();
	const id = document.getElementById("id").value;
	const name = document.getElementById("name").value;
	const gender = document.getElementById("gender").value;
	const dateOfBirth = document.getElementById("dateOfBirth").value;
	const address = document.getElementById("address").value;

	const student = new Student(id, name, gender, dateOfBirth, address);
	console.log(student);
	manager.addStudent(student);
	manager.displayStudents();
	this.reset();
});

function editStudent(index) {
	const student = manager.students[index];
	document.getElementById("id").value = student.id;
	document.getElementById("name").value = student.name;
	document.getElementById("gender").value = student.gender;
	document.getElementById("dateOfBirth").value = student.dateOfBirth;
	document.getElementById("address").value = student.address;

	const submitButton = document.querySelector(
		'#studentForm button[type="submit"]'
	);
	submitButton.textContent = "Cập nhật Sinh viên";
	submitButton.onclick = function (e) {
		e.preventDefault();
		const updatedStudent = new Student(
			document.getElementById("id").value,
			document.getElementById("name").value,
			document.getElementById("gender").value,
			document.getElementById("dateOfBirth").value,
			document.getElementById("address").value
		);
		manager.updateStudent(index, updatedStudent);
		manager.displayStudents();
		document.getElementById("studentForm").reset();
		submitButton.textContent = "Thêm Sinh viên";
		submitButton.onclick = null;
	};
}

function deleteStudent(index) {
	if (confirm("Bạn có chắc chắn muốn xóa sinh viên này?")) {
		manager.deleteStudent(index);
		manager.displayStudents();
	}
}
