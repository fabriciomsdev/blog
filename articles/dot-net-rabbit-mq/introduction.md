# How understanding RabbitMQ with dot Net Core.

In my first article, written when I had listened  "The Who - My Generation".  I bring to you a simple way to use one of the best technologies do you need now in times in which the user's and device's quantity was growing exponentially. You need the most performance and better scalability ... more and more. 

RabbitMQ gives you a simple Message Broker Service to helps you to deliver messages on distributed systems, as microservice. You are mentally asking what is "Message Broker Service"? And why I need this? 

Well, let's go to the real world.

## What is a Message Broker Service?

Imagine that you have 1 million users making request to you API for different features and routes.  How you can improve your performance in this case? I think what do you make microservices is a solution, well is one of the most solutions. In this case, how your microservice was making communications between self? You should think in Http ... But in a large number of requests, you don't get a good performance in the most of cases. What do you do where a request was interrupted by any system problem or infrastructure problem? In this scenario to emerge to the dark world, a tool will help you to lose less hair. 

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

## What is a Publisher?

### Making a Publisher with dot Net Core

## What is a Consumer?

### Making a Consumer with dot Net Core

## How send and test my first message.
