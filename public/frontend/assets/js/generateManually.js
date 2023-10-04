const buttonGenerate = document.querySelector('#buttonGenerate');
const educador = document.getElementById('educador');

buttonGenerate.addEventListener("click", function (e) {
    e.preventDefault();
    preencherCertificado();
    gerarCertificadoManual();
})

function preencherCertificado() {
    // Função para capitalizar a primeira letra de cada palavra
    function capitalizeWords(str) {
        return str.replace("/\b\w/g", (char) => char.toUpperCase());
    }

    let aluno = document.querySelector('#aluno').value;
    let nomeFormatado = capitalizeWords(aluno);

    let curso = document.querySelector("#curso").value;
    let cursoFormatado = capitalizeWords(curso);

    let carga = document.querySelector("#carga").value;
    let educador = document.querySelector("#educador").value.toLowerCase(); // Converter para minúsculas

    const arrayImg = [
        "assets/img/assinaturaFilipe.png",
        "assets/img/assinaturaIgor.png",
        "assets/img/assinaturaMiqueias.png",
        "assets/img/assinaturaNadine.png",
        "assets/img/assinaturaPaula.png",
        "assets/img/assinaturaReginaldo.png",
        "assets/img/assinaturaSara.png"
    ];

    const educadores = {
        filipe: 0,
        igor: 1,
        miqueias: 2,
        nadine: 3,
        paula: 4,
        reginaldo: 5,
        sara: 6,
    };

    if (educador in educadores) {
        const educadorN = educadores[educador];
        document.getElementById("content").innerHTML = `
            <div class="center">
                <p class="titulo conteudo">Certificado</p>
                <p class="fonte-normal-1">A Prepara Cursos certifica para devidos fins que</p>
                <p class="nome-aluno">${nomeFormatado}</p>
                <p class="fonte-normal-2">Concluiu com êxito a Oficina de ${cursoFormatado} em 2023, com a carga horária total de
                    ${carga} hora(s) na Prepara Cursos.</p>
                <img class="signature" src="${arrayImg[educadorN]}">
                <p class="local">Vitória da Conquista, Bahia</p>
            </div>
        `;
    } else {
        // Trate o caso em que o educador não está no mapeamento
        document.getElementById("content").innerHTML = `
            <div class="center">
                <p class="titulo conteudo">Certificado</p>
                <p class="fonte-normal-1">A Prepara Cursos certifica para devidos fins que</p>
                <p class="nome-aluno">${nomeFormatado}</p>
                <p class="fonte-normal-2">Concluiu com êxito a Oficina de ${cursoFormatado} em 2023, com a carga horária total de
                    ${carga} hora(s) na Prepara Cursos.</p>
                    <p class="fonte-normal-2">Assinatura do Educador não encontrada.</p>
                <p class="local">Vitória da Conquista, Bahia</p>
            </div>
        `;
    }
}


function gerarCertificadoManual() {

    let aluno = document.querySelector('#aluno').value;
    let content = document.querySelector('#content');

    //configuração do arquivo final do pdf
    const options = {
        margin: [0, 0, 0, 0],
        filename: aluno + ".pdf",
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'mm', format: 'A5', orientation: 'landscape' /*colocar em paisagem*/ },
    };

    //Gerar e baixar o PDF
    html2pdf().set(options).from(content).save();
}