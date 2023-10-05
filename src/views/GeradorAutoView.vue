<template>
  <div class="bg-dark-subtle tela">
    <div class="container">
      <div class="row pt-5">
        <div>
          <div class="generateAll">
            <h3>Selecione um arquivo em excel e escolha onde salvar:</h3>
            <input type="file" id="excelFileInput" ref="fileInput" @change="handleFile" />
            <div id="dataDisplay"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import html2pdf from "html2pdf.js";
import * as XLSX from "xlsx";

export default {
  data() {
    return {
      arrayImg: [
        "/img/assinaturaFilipe.png",
        "/img/assinaturaIgor.png",
        "/img/assinaturaMiqueias.png",
        "/img/assinaturaNadine.png",
        "/img/assinaturaPaula.png",
        "/img/assinaturaReginaldo.png",
      ],
      educadorMap: {
        filipe: 0,
        igor: 1,
        miqueias: 2,
        nadine: 3,
        paula: 4,
        reginaldo: 5,
        sara: 6,
        geral: 7,
      },
      educadorIndex: "",
      assinatura: "",
    };
  },
  methods: {
    handleFile(event) {
      const file = event.target.files[0];

      if (file) {
        const reader = new FileReader();

        reader.onload = (e) => {
          console.log("Arquivo carregado com sucesso!");
          const data = new Uint8Array(e.target.result);

          this.workbook = XLSX.read(data, { type: "array" });
          const sheetName = this.workbook.SheetNames[0];
          const sheet = this.workbook.Sheets[sheetName];

          const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

          // Itera pelos dados dos alunos e gera um certificado para cada um
          for (let i = 1; i < jsonData.length; i++) {
            // Começa a partir da segunda linha, assumindo que a primeira linha é de cabeçalho
            const aluno = jsonData[i];
            const educador = aluno[3]
              .normalize("NFD")
              .replace(/[\u0300-\u036f]/g, "")
              .toLowerCase();

            if (educador in this.educadorMap) {
              this.educadorIndex = this.educadorMap[educador];
              this.assinatura = this.arrayImg[this.educadorIndex];

              const certificateDiv = document.createElement("div");
              certificateDiv.classList.add("certificate");

              certificateDiv.innerHTML = `
              <div class="container-form">
                <div id="content">
                  <div class="center">
                    <p class="titulo conteudo">Certificado</p>
                    <p class="fonte-normal-1">A Prepara Cursos certifica para devidos fins que</p>
                    <p class="nome-aluno">${this.nomeValid(aluno[0])}</p>
                    <p class="fonte-normal-2">Concluiu com êxito a Oficina de ${this.cursoValid(
                      aluno[1]
                    )} em 2023, com a carga horária total de
                      ${aluno[2]} hora(s) na Prepara Cursos.</p>
                    <img class="signature" src="${this.assinatura}">
                    <p class="local">Vitória da Conquista, Bahia</p>
                  </div>
                </div>
              </div>
              `;

              // Gere o certificado em PDF
              this.gerarCertificado(this.nomeValid(aluno[0]), certificateDiv);
            }
          }
        };

        reader.readAsArrayBuffer(file);
      } else {
        console.error("Nenhum arquivo selecionado.");
      }
    },
    gerarCertificado(aluno, content) {
      //configuração do arquivo final do pdf
      const options = {
        margin: [0, 0, 0, 0],
        filename: aluno + ".pdf",
        html2canvas: { scale: 2 },
        jsPDF: {
          unit: "mm",
          format: "A5",
          orientation: "landscape" /*colocar em paisagem*/,
        },
      };

      //Gerar e baixar o PDF
      html2pdf().set(options).from(content).save();
    },
    nomeValid(nome) {
      if (nome.length > 35) {
        const partesNome = nome.split(" ");
        const primeiroNome = partesNome[0];
        const ultimoNome = partesNome[partesNome.length - 1];
        let nomeMeioAbreviados = "";

        if (partesNome.length > 3) {
          nomeMeioAbreviados =
            " " +
            partesNome[1].charAt(0) +
            ". " +
            partesNome[partesNome.length - 2].charAt(0) +
            ".";
        } else {
          for (let i = 1; i < partesNome.length - 1; i++) {
            nomeMeioAbreviados += " " + partesNome[i];
          }
        }
        return `${primeiroNome} ${nomeMeioAbreviados} ${ultimoNome}`;
      } else {
        return nome;
      }
    },
    cursoValid(curso) {
      if (curso.length > 40) {
        const partesCurso = curso.split(" ");
        const primeiroNomeCurso = partesCurso[0];
        const ultimoNomeCurso = partesCurso[partesCurso.length - 1];
        let nomeCursoMeio = "";

        if (partesCurso.length > 2) {
          nomeCursoMeio =
            " " +
            partesCurso[1].charAt(0) +
            ". " +
            partesCurso[partesCurso.length - 2].charAt(0) +
            ".";
        } else {
          for (let i = 1; i < partesCurso.length - 1; i++) {
            nomeCursoMeio += " " + partesCurso[i];
          }
        }
        return `${primeiroNomeCurso} ${nomeCursoMeio} ${ultimoNomeCurso}`;
      } else {
        return curso;
      }
    },
  },
};
</script>

<style>
.container-form {
  display: grid;
  place-items: center;
}

.signature {
  width: 10em;
}
</style>
