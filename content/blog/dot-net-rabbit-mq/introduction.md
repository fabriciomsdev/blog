---
title: How understanding RabbitMQ with dot Net Core
date: "2020-02-30T22:00:03.284Z"
description: "How to make a simple RabbitMQ connection with dotNet Core"
---

# How understanding RabbitMQ with dot Net Core.

In my second article, written when I had listened  "The Who - My Generation".  I bring to you a simple way to use one of the best technologies do you need now in times in which the user's and device's quantity was growing exponentially. You need the most performance and better scalability ... more and more. 

RabbitMQ gives you a simple Message Broker Service to helps you to deliver messages on distributed systems, as microservice. You are mentally asking what is "Message Broker Service"? And why I need this? 

Well, let's go to the real world.

## What is a Message Broker Service?

Imagine that you have 1 million users making request to you API for different features and routes.  How you can improve your performance in this case? I think what do you make microservices is a solution, well, is one of the most solutions. In this case, how your microservice was making communications between self? You should think in Http ... But in a large number of requests, you don't get a good performance in the most of cases. What do you do where a request was interrupted by any system problem or infrastructure problem? In this scenario to emerge to the dark world, a tool will help you to lose less hair. 

The Messages Broker sends messages between your microservices using AMPQ protocol, below you can see a comparison between Http and AMPQ protocol. 

## Advantages of HTTP.

1 · Debugging an HTTP request is really easy and repeatable, whereas an AMQP message is harder to debug (you need a connection to the queue, libraries, maybe scripting, etc...).

2 · HTTP is a familiar technology for the developers, so there is no need to have extra training for a new developer in the project.

3 - HTTP is the most supported protocol on the internet, so sharing your APIs as HTTP API is a good practice.

## Advantages of AMQP.

1 · Delivering messages with AMQP gives you reliability and being asynchronous allows you to not worry about the delivery at all.

2 · Knowing the host/IP of the cluster of AMQP brokers is enough to deliver/receive messages, whereas with HTTP you may have different hosts and IP depending on regions.

3 · You can use fanouts, meaning that one message will be enough to inform several different components, reducing the number of communications.

By the way, AMPQ solves problems that HTTP not resolve, but use as moderation, as you see the complexity over the project can grow.

Backing to Rabbit MQ explanation.

It is one of the most simple and fast MSB that you see. Your implementation is very easy in comparison to your comrades (Kafka, A.MSB, etc). You can run a simple Rabbit MQ service running with docker command:

```
docker run -d \
--hostname rabbit-mq \
--name rabbit-mq-service \
-p 5672:5672 \
-p 15672:15672 \ 
-e RABBITMQ_DEFAULT_USER=admin \
RABBITMQ_DEFAULT_PASS=admin123! \
rabbitmq:3-management

```

<b>
  You don't know Docker? (See my first article about the best containization tool).
</b>

Using this command above, you as running a RabbitMQ server connected to the ports  5672 and 15672.

Lets go to send your first message.

## The mainstream ... Understanding Publisher and Consumer Architecture. 

## What is a Publisher and Consumer in a Microservices Architecture?

Publisher who is the guy to send messages and talk with anybody is hearing you or is authorized to hear your messages, think 
you is making a hangout with your friends to talk about whats is wonderfull in your life, happiness should be a secret and you can
saw to only less number of friends about this. And you send a invite and lets talk, at this moment you are the Publisher sending messages
to other microservices, or better talking Consumers, (Your friends, who will get and processing the messages) in your Channel (Hangout) and who can have your Authorization (Your invite).


### Making a Publisher with dot Net Core

1 - First check if do you have dot net core. I your terminal you should type:

```
  dotnet --help
```

2 - Now lets generate the Publisher

```
dotnet new console --name Publisher
cd Publisher
```

3 - Now add the RabbitMQ library

```
dotnet add package RabbitMQ.Client
dotnet restore
```

4 - In the Program.cs file add:

```
using System;
using RabbitMQ.Client;
using System.Text;

class Send
{
    public static void Main()
    {
        /// In there you should be set your rabbit-mq connection in docker
        var factory = new ConnectionFactory() { 
          HostName = "localhost"; 
          Port = 5672;
          UserName = "admin";
          Password = "admin123!"
        };
        
        using(var connection = factory.CreateConnection())
        using(var channel = connection.CreateModel())
        {
            /// Setting up the Queue name where you send messages
            channel.QueueDeclare(queue: "firstQueue",
                                 durable: false,
                                 exclusive: false,
                                 autoDelete: false,
                                 arguments: null);

            /// Your first messsage
            string message = "My message of my first publisher";
            var body = Encoding.UTF8.GetBytes(message);

            /// Publish your first message
            channel.BasicPublish(exchange: "",
                                 routingKey: "hello",
                                 basicProperties: null,
                                 body: body);

            Console.WriteLine(" [x] Sent {0}", message);
        }

        Console.WriteLine(" Press [enter] to exit.");
        /// Waiting a comand to close
        Console.ReadLine();
    }
}

```

### Making a Consumer with dot Net Core

1 - Now lets generate the Consumer

```
dotnet new console --name Consumer
cd Consumer
```

2 - Now add the RabbitMQ library

```
dotnet add package RabbitMQ.Client
dotnet restore
```

3 - In the Program.cs file add:

```

using RabbitMQ.Client;
using RabbitMQ.Client.Events;
using System;
using System.Text;

class Consumer
{
    public static void Main()
    {
        var factory = new ConnectionFactory() { 
          HostName = "localhost"; 
          Port = 5672;
          UserName = "admin";
          Password = "admin123!"
        };

        using(var connection = factory.CreateConnection())
        using(var channel = connection.CreateModel())
        {
            /// Setting up the Queue name where you hear messages
            channel.QueueDeclare(queue: "firstQueue",
                                 durable: false,
                                 exclusive: false,
                                 autoDelete: false,
                                 arguments: null);

            var consumer = new EventingBasicConsumer(channel);
            consumer.Received += (model, ea) =>
            {
                var body = ea.Body;
                var message = Encoding.UTF8.GetString(body);
                Console.WriteLine(" [x] Received {0}", message);
            };
            channel.BasicConsume(queue: "firstQueue",
                                 autoAck: true,
                                 consumer: consumer);

            Console.WriteLine(" Press [enter] to exit.");
            Console.ReadLine();
        }
    }
}

```


## How send and test my first message.


1 - Put the Consumer to hear

```
  cd Consumer
  dotnet run
```

2 - Put the Publisher to send message

```
  cd Publisher
  dotnet run
```

## Next step

In the my next article I will bring to you an evolution of this aproache using a real case, an begin Authentication microservice pool with 
the most common functions used for authenticate users.

Thanks for read this article! Send comments and sugestions to contato@fabricioms.dev

I see you soon! 

Bye.