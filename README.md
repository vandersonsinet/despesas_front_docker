# Esta é uma aplicaçao para registro de depesas em React

O objetivo desse sistema é oferecer um registro das suas despesas e ajudá-lo neste controle.

Seu desenvolvimento é baseado em React utilizando o conceito de componentizacao. Foi reutilizado o conceito de reutilizaçao de componentes nas páginas, o que torna o codigo mais limpo e dinamico. 

Esta aplicacao se comunica com uma API com as rotas necessárias para manter o cadastro das despesas.

Na tela de despesas, voce poderá incluir a lista de despesas por tipo e, posteriormente, verificar na tela de resumo, um conjunto de cards com gasto total para cada tipo de despesa registrada.

Criamos um gráfico para ajudar na visualizaçao do valor das despesas por tipo. Dessa forma, voce é possivel verificar mais facilmente quais foram os maiores gastos.

## Como executar o servidor

Será necessário ter o [Nodejs, ou o npm,](https://nodejs.org/en/download/) instalado. 

Após clonar o repositório, é necessário ir ao diretório raiz desse projeto pelo terminal para poder executar os comandos descritos abaixo.

```
$ npm install
```

Este comando instala as dependências/bibliotecas, descritas no arquivo `package.json`. Uma pasta chamada `node_modules` será criada.

Para executar a interface basta executar o comando: 

```
$ npm start
```

Abra o [http://localhost:3000/#/](http://localhost:3000/#/) no navegador.

## Como executar atraves do Docker

Certifique-se de ter o Docker instalado e em execução em sua máquina.

Navegue até o diretório que contém o Dockerfile e o requirements.txt no terminal. Execute como administrador o seguinte comando para construir a imagem Docker:

$ docker build -t imagem-frontend .  

Uma vez criada a imagem, para executar o container basta executar, como administrador, seguinte o comando:

$ docker run -p 3000:3000 imagem-frontend
