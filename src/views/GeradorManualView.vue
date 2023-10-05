<template>
  <div class="bg-dark-subtle tela">
    <div class="container">
      <div class="row pt-5">
        <div class="col">
          <div class="certificateManually">
            <h3 class="title-h3">Dados do aluno:</h3>
            <label class="label" for="nome">Nome completo do aluno</label>
            <input type="text" id="aluno" name="nome" maxlength="30" v-model="aluno" />

            <label class="label" for="curso">Curso realizado</label>
            <input type="text" id="curso" name="curso" maxlength="55" v-model="curso" />

            <label class="label" for="carga">Carga horária</label>
            <input type="number" id="carga" name="carga" v-model="carga" />

            <label for="educador">Educador que realizou</label>
            <select name="educador" id="educador" v-model="educador">
              <option value="filipe">Filipe</option>
              <option value="igor">Igor</option>
              <option value="miqueias">Miquéias</option>
              <option value="nadine">Nadine</option>
              <option value="paula">Paula</option>
              <option value="reginaldo">Reginaldo</option>
              <option value="sara">Sara</option>
              <option value="assinaturaGeral">Assinatura geral</option>
            </select>

            <button id="buttonGenerate" @click="gerarCertificadoManual">
              Gerar certificado manualmente
            </button>
          </div>
        </div>

        <div class="col">
          <div class="container-form">
            <div id="content">
              <div class="center">
                <p class="titulo">Certificado</p>
                <p class="fonte-normal-1">
                  A Prepara Cursos certifica para devidos fins que
                </p>
                <p class="nome-aluno">{{ this.aluno }}</p>
                <p class="fonte-normal-2">
                  Concluiu com êxito a Oficina de {{ this.curso }} em 2023, com a carga
                  horária total de {{ this.carga }} hora(s) na Prepara Cursos.
                </p>
                <img class="signature" :src="assinatura" alt="">
                <p class="local">Vitória da Conquista, Bahia</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import html2pdf from "html2pdf.js";

export default {
  data() {
    return {
      aluno: "",
      curso: "",
      carga: "",
      educador: "filipe", // Valor padrão
      arrayImg: [
        "..//public/img/assinaturaFilipe.png",
        "..//public/img/assinaturaIgor.png",
        "..//public/img/assinaturaMiqueias.png",
        "..//public/img/assinaturaNadine.png",
        "..//public/img/assinaturaPaula.png",
        "..//public/img/assinaturaReginaldo.png",
      ],
      educadores: {
        filipe: 0,
        igor: 1,
        miqueias: 2,
        nadine: 3,
        paula: 4,
        reginaldo: 5,
        sara: 6,
        geral: 7,
      },
      content: "",
      educadorN: "",
      assinatura: "",
    };
  },
  mounted() {
    this.geraralgo();
  },
  computed: {
    nomeFormatado() {
      return this.capitalizarPalavras(this.aluno);
    },
    cursoFormatado() {
      return this.capitalizarPalavras(this.curso);
    },
    educadorIndex() {
      return this.educadores[this.educador] || -1;
    },
  },
  methods: {
    geraralgo() {
      this.gerarCertificadoManual;
    },
    capitalizarPalavras(str) {
      return str.replace(/(?:^|\s)\S/g, (char) => char.toUpperCase());
    },
    gerarCertificadoManual() {
      this.aluno = this.nomeFormatado;
      this.curso = this.cursoFormatado;

      if (this.educador in this.educadores) {
        this.educadorN = this.educadores[this.educador];
        this.assinatura = this.arrayImg[this.educadorN];
        this.content = `
        <div class="container-form">
            <div id="content">
              <div class="center">
                <p class="titulo">Certificado</p>
                <p class="fonte-normal-1">
                  A Prepara Cursos certifica para devidos fins que
                </p>
                <p class="nome-aluno">${this.aluno}</p>
                <p class="fonte-normal-2">
                  Concluiu com êxito a Oficina de ${this.curso} em 2023, com a carga
                  horária total de ${this.carga} hora(s) na Prepara Cursos.
                </p>
                <img class="signature" src="${this.assinatura}" alt="">
                <p class="local">Vitória da Conquista, Bahia</p>
              </div>
            </div>
          </div>`;
      }
      const options = {
        margin: [0, 0, 0, 0],
        filename: this.aluno + ".pdf",
        html2canvas: { scale: 2 },
        jsPDF: { unit: "mm", format: "A5", orientation: "landscape" },
      };

      html2pdf().set(options).from(this.content).save();
    },
  },
};
</script>

<style>
@import url("https://fonts.cdnfonts.com/css/apple-chancery");
@import url("https://fonts.googleapis.com/css2?family=Tangerine:wght@700&display=swap");

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.tela {
  height: 100vh;
}

.col-form {
  display: flex;
  justify-content: center;
  align-items: center;
}

.title-project {
  text-align: center;
  margin-bottom: 1em;
  margin-top: 1rem;
}

.title-h3 {
  margin-bottom: 0.7em;
  font-size: 2.3em;
}

.formulario {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #00000091;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  color: #fff;
}

.label {
  display: block;
  margin-top: 10px;
  text-align: left;
}

input {
  width: 100%;
  padding: 10px;
  margin-top: 5px;
  border: 1px solid #ccc;
  border-radius: 3px;
}

#buttonGenerate {
  display: block;
  margin: 0 auto;
  width: 100%;
  height: 4em;
  padding: 10px;
  background-color: #2317c7;
  color: #fff;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  margin-top: 2em;
  margin-bottom: 1em;
  font-weight: bold;
  transition: ease-in-out 0.4s;
  border-radius: 5px;
}

#buttonGenerate:hover {
  transition: ease-in-out 0.4s;
  background-color: #1b41ea;
}

.container-form {
  display: grid;
  place-items: center;
}

#content {
  background-image: url("../../public//img/modeloPrepara.jpeg");
  background-size: cover;
  background-position: center center;
  width: 49em;
  height: 33em;
  font-family: "Tangerine", cursive;
}

.center {
  position: static;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding-top: 2em;
}

.titulo {
  width: 70%;
  font-size: 5em;
  margin: 0;
}

.nome-aluno {
  width: 70%;
  font-size: 3em;
  margin: 0;
  color: #c7051c;
  text-transform: capitalize;
}

.fonte-normal-1,
.fonte-normal-2 {
  width: 70%;
  margin-top: 0px;
  margin-bottom: 0px;
  font-size: 1.5rem;
}

.local {
  width: 70%;
  margin-top: 0;
  font-size: 1.5rem;
}

.certificateManually {
  padding: 1em;
}

#educador {
  margin-top: 1em;
  margin-left: 1em;
  width: 30%;
}

.signature {
  width: 9em;
  border-bottom: solid 1px;
  margin: 1em;
  text-align: center;
}
</style>
