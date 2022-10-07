---
layout: post
title: "Introdução ao Solidity"
date: 2018-07-14
image: '/assets/img/'
permalink: /blog/solidity
description: Um pouco do que li sobre solidity
---

Olá mundo, neste artigo irei falar um pouco sobre essa nova linguagem orientada a contratos e que está sendo criada e abraçada pela comunidade do Ethereum.

## O que é Solidity?

Solidity é uma linguagem de alto nível e orientada a contratos, desenhada com o propósito de facilitar a criação de Smart Contracts. É influenciada por C++, Python e Javascript com o objetivo de facilitar a programação de contratos inteligentes na Ethereum Virtual Machine (EVM).

> Certo, mas o que é Ethereum e esse tal de Smart Contracts? Blockchain é o negócio do Bitcoin lá né?

Calma, se você não sabe esses termos e está perdido recomendo que veja os vídeos abaixos:

* [Sobre Ethereum na visão do próprio fundador o Vitalik Buterin](https://youtu.be/TDGq4aeevgY) (em inglês)
* [Mais detalhes sobre o Ethereum](https://youtu.be/5rh1THmpiOI) (legendas em português)
* [Sobre Blockchain](https://youtu.be/SSo_EIwHSd4) (legendas em português)
* [Sobre Smart Contracts](https://youtu.be/ZE2HxTmxfrI) (legendas em português)

Como o foco desse artigo é uma introdução a essa nova linguagem, é necessário pelo menos um conhecimento básico sobre essas nova tecnologias antes de avançarmos mais na questão técnica.

## O Código é Lei

A primeira mudança de paradigma começa com essa afirmação: “O código é lei”. Para quem está acostumado a fazer formulários de CRUD e fazer aquele puxadinho no código porque o cliente pediu, pode estranhar ao saber que, uma vez colocado no ar o seu contrato ele jamais poderá ser alterado.

E uma linha de código faz diferença, como o [caso do DAO](https://medium.com/swlh/the-story-of-the-dao-its-history-and-consequences-71e6a8a551ee) aonde 70 milhões de dólares foram roubados através de uma chamada recursiva no "método withdraw".

Cômico e trágico, o que gerou até um fork no que culminou na Ethereum Classic.

Portanto, que fique claro o aviso, programar contratos demanda atenção em dobro, ainda mais devido a imutabilidade do código e dos registros ad eternum gravados no blockchain.

## O Contrato é Classe

Para quem está acostumado no mundo de orientações a objeto, classes estão em todo lugar e no Solidity, classes são contratos.

```
contract SimpleStorage {

   uint storedData;

   function set(uint x) {

       storedData = x;

   }

   function get() constant returns (uint retVal) {

       return storedData;

   }

}
```

No exemplo acima, extraído da [documentação do Solidity](http://solidity.readthedocs.io/en/v0.4.24/), estamos inicializando um contrato chamado SimpleStorage, o qual irá receber um parâmetro chamado X, que será um uint.

> pausa para o *uint*.

uint é uma abreviação para uint256. Ou seja, é um int de 256 bits, o qual você deverá usar para registrar as transações do seu contrato na blockchain.

No Solidity você também pode usar o empacotamento, para economizar nessas transações, que nada mais é do que cortar o uint256 em pedaços de até 8 bits (uint8) e empacotar eles numa variável uint256.

No dia-a-dia da vida de programador, dificilmente usamos uint para gravar a idade de alguém, neste caso usaríamos o byte, ou equivalente, que vai de 0 – 255, e se você usa int para gravar idade na sua aplicação, acredite, você está fazendo algo errado.

Além disso, vale ressaltar que as variáveis de estado, neste caso uint StorageDate, serão permanentemente gravados no armazenamento do contrato.

> E essas Functions aí?

Neste caso, o contrato de exemplo tem apenas duas funções, set e get, que tem como objetivo guardar e gravar os dados passados.

É valido notar que temos a palavra chave returns no método set, o qual é necessário informar sempre que a sua função tiver um retorno, junto também com o tipo de retorno em parênteses, neste caso um uint.

## Conclusão

Como disse, este artigo é uma apenas uma introdução a essa nova linguagem, se ficou interessado recomendo fortemente que você vire um zumbi e faça o curso da Loom Network, [CryptoZombies](https://cryptozombies.io/pt), é de graça. Eu fiz e recomendo fortemente.

Também não deixe de visitar a documentação oficial da linguagem para mais informações: [http://solidity.readthedocs.io/](http://solidity.readthedocs.io/)

Dúvidas e sugestões nos comentários.

Abraços.
