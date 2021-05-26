import { Component, OnInit } from '@angular/core';

import * as $ from "jquery";
// import * as jspdf from 'jspdf';
import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';
@Component({
  selector: 'app-admission-form-print-layout',
  templateUrl: './admission-form-print-layout.component.html',
  styleUrls: ['./admission-form-print-layout.component.scss']
})
export class AdmissionFormPrintLayoutComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  exportAsPDF() {
		console.log("name->", )

		// const div = document.querySelector(".ck-content");
		const options = {
			background: 'white',
			scale: 3
		};

		html2canvas(document.querySelector(".printLayout"), options).then((canvas) => {

			var img = canvas.toDataURL("image/PNG");
			console.log("img from export Fuction", img);
			var doc = new jsPDF("p", "mm", "a4", true);
			var imgWidth = 210;
			var pageHeight = 295;
			var imgHeight = canvas.height * imgWidth / canvas.width;
			var heightLeft = imgHeight;
			const imgData = canvas.toDataURL('image/png')
			var position = 0;

			doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight + 15);
			heightLeft -= pageHeight;

			while (heightLeft >= 0) {
				position = heightLeft - imgHeight;
				doc.addPage();
				doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight + 15);
				heightLeft -= pageHeight;
			}
			return doc;
		}).then((doc) => {
			const fileName = "test"
			doc.save(fileName + '_qbase' + '.pdf');
		});

	}

}
