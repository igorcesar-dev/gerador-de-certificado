# Projeto Gerador de Certificado

## Introdução

O projeto "Gerador de Certificado" foi desenvolvido para auxiliar educadores de uma escola de cursos profissionalizantes na emissão de certificados. A alta demanda por certificados torna manualmente difícil e suscetível a erros a criação de certificados personalizados para cada aluno. Este projeto automatiza esse processo, permitindo que educadores insiram informações específicas para cada aluno e gerem certificados em PDF prontos para serem distribuídos.

## Visão Geral do Projeto
O projeto é composto por três componentes principais: 
* HTML;
* CSS;
* JavaScript;
* Vue.js;
* Html2pdf;
  
## Utilização do Projeto
Para utilizar o projeto Gerador de Certificado, siga os seguintes passos:

Preencha o formulário com as informações necessárias:

1. Nome completo do aluno.
2. Nome do curso.
3. Carga horária do curso.
4. Educador que ministrou o curso (selecione na lista).
5. Clique no botão "Gerar Certificado". Isso irá preencher o modelo de certificado com as informações fornecidas e gerar um certificado em PDF.

Ou você pode enviar um arquivo no formato XLSX na aba de gerar certificado automaticamente.

## Limitações
* O projeto não realiza validações de dados além de verificar o tamanho máximo para os campos de nome do aluno e nome do curso.
* Não há controle de autenticação ou de acesso, o que significa que qualquer pessoa pode acessar e usar o sistema.
* Não é possível personalizar o modelo do certificado diretamente no site; isso deve ser feito manualmente, alterando a imagem de fundo no código CSS.

## Considerações Finais
O projeto "Gerador de Certificado" está em desenvolvimento e passará por atualizações.
