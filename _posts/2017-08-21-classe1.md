--- 
layout: post 
title: Criando uma conexão com Oracle Client 
date: 2017-08-03 03:32:44
image: '/assets/img/'
description: 'Comentando um classe utilizada para acessar o banco de dados da Oracle usando OracleClient'
tags:
- jekyll 
- template 
categories:
- I love Jekyll
permalink: '/criando-uma-conexao-com-oracle-client-usando-csharp/'
---
## Mostrando o código

Criando uma conexão com `Oracle Client` usando C#
Abaixo segue o código utilizado para a criação de um cliente de acesso ao Oracle.

{% highlight csharp%}
//criamos a classe conexao
public class Conexao
{
    //começamos com uma variável estática para acessar a conexão com o banco
    private static OracleConnection sqlConn;

    //neste caso como usamos a mesma classe para acessar múltiplos bancos
    //criamos um método que retorna vazio e recebe o parâmetro DBschema
    //que será o caminho da String de Conexão aonde está localizado o banco
    //e adicionamos esse caminho a ConnectionString da variável instânciada anteriormente
    public void DBConnection(string DBschema)
    {
        string schema = "'" + DBschema + "'";
        sqlConn = new OracleConnection();
        sqlConn.ConnectionString = ConfigurationManager.ConnectionStrings[schema].ConnectionString;
    }

    //metódo para abrir a conexão
    public void openConnection()
    {
        sqlConn.Open();
    }

    //método para fecha a conexão
    public void closeConnection()
    {
        sqlConn.Close();
    }

    //método estático que retorna a conexão dentro da classe OracleConnection
    public static OracleConnection Connection
    {
        get { return sqlConn; }
    }

    //variável estática do tipo OracleTransaction e depois o método estático
    private static OracleTransaction transaction;
    public static OracleTransaction Transaction
    {
        get { return transaction; }
    }

    //metódo para começar a transação
    public OracleTransaction BeginTransaction()
    {
        transaction = sqlConn.BeginTransaction();
        return transaction;
    }

    //método que dá o commit da transação
    public void Commit()
    {
        transaction.Commit();
        transaction.Dispose();
        transaction = null;
    }

    //método que dá o rollback da transação
    public void RollBack()
    {
        transaction.Rollback();
        transaction.Dispose();
        transaction = null;
    }
}
{% endhighlight %}