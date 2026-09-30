---
layout: post
title: "An Introduction to Solidity"
date: 2018-07-14
image: '/assets/img/'
permalink: /en/blog/solidity-introduction
description: A little of what I learned about Solidity
lang: en
translation_key: /blog/solidity
translation_url: /blog/solidity
---

Hello, world. In this article, I will talk a little about this new contract-oriented language being created and embraced by the Ethereum community.

## What is Solidity?

Solidity is a high-level, contract-oriented language designed to make it easier to create smart contracts. It is influenced by C++, Python, and JavaScript, with the goal of making it easier to program contracts for the Ethereum Virtual Machine (EVM).

> All right, but what are Ethereum and these so-called smart contracts? Blockchain is that Bitcoin thing, right?

Hold on. If these terms are new to you and you are lost, I recommend watching these videos:

* [Ethereum, as explained by its founder, Vitalik Buterin](https://youtu.be/TDGq4aeevgY) (in English)
* [More about Ethereum](https://youtu.be/5rh1THmpiOI) (Portuguese subtitles)
* [About blockchain](https://youtu.be/SSo_EIwHSd4) (Portuguese subtitles)
* [About smart contracts](https://youtu.be/ZE2HxTmxfrI) (Portuguese subtitles)

Since this article is an introduction to the language, you will need at least a basic understanding of these technologies before we move on to the technical details.

## Code is law

The first paradigm shift starts with this statement: "Code is law." If you are used to building CRUD forms and patching the code because a client asked for something, it may be strange to learn that once your contract is deployed, it can never be changed.

Every line of code matters. In [the DAO incident](https://medium.com/swlh/the-story-of-the-dao-its-history-and-consequences-71e6a8a551ee), for example, 70 million dollars were stolen through a recursive call to the `withdraw` method.

It was both comic and tragic, and it even led to a fork that eventually became Ethereum Classic.

So let this be clear: writing contracts demands twice as much attention, especially because the code and records stored on the blockchain are immutable and remain there forever.

## A contract is a class

If you are used to object-oriented programming, classes are everywhere. In Solidity, classes are contracts.

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

In the example above, taken from the [Solidity documentation](http://solidity.readthedocs.io/en/v0.4.24/), we initialize a contract named `SimpleStorage`. It receives a parameter named `x`, which is a `uint`.

> A quick pause for `uint`.

`uint` is short for `uint256`. In other words, it is a 256-bit integer that you can use to record your contract's transactions on the blockchain.

Solidity also lets you use packing to save on these transactions. This means splitting a `uint256` into chunks of up to 8 bits (`uint8`) and packing them into a `uint256` variable.

In day-to-day programming, we would rarely use a `uint` to store someone's age. We would use a byte, or its equivalent, which ranges from 0 to 255. And if you use an `int` to store someone's age in your application, believe me, you are doing something wrong.

It is also worth noting that state variables, such as `uint storedData`, are permanently stored in the contract's storage.

> And what about those functions?

This example contract has only two functions, `set` and `get`, whose purpose is to store and retrieve the data passed to them.

It is worth noting the `returns` keyword. You must include it whenever a function returns a value, along with the return type in parentheses, which in this case is a `uint`.

## Conclusion

As I said, this article is only an introduction to the language. If you are interested, I strongly recommend becoming a zombie and taking the Loom Network course [CryptoZombies](https://cryptozombies.io/pt). It is free. I took it and highly recommend it.

Also, be sure to visit the official language documentation for more information: [http://solidity.readthedocs.io/](http://solidity.readthedocs.io/)

Questions and suggestions are welcome in the comments.

Cheers.