package com.rentler.helper.rabbit;

import org.springframework.amqp.core.AmqpAdmin;
import org.springframework.amqp.core.Queue;
import org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.annotation.PostConstruct;

@Configuration
public class RabbitConfig {

    public static final String WELCOME_MAILS_QUEUE_NAME = "WelcomeMails";
    public static final String APPLICATIONS_NEW_MAILS_QUEUE_NAME = "ApplicationsNewMails";
    public static final String APPLICATIONS_APPROVED_MAILS_QUEUE_NAME = "ApplicationsApprovedMails";
    public static final String APPLICATIONS_REJECTED_MAILS_QUEUE_NAME = "ApplicationsRejectedMails";

    private final AmqpAdmin amqpAdmin;

    public RabbitConfig(AmqpAdmin amqpAdmin) {
        this.amqpAdmin = amqpAdmin;
    }

    @PostConstruct
    public void createQueues() {
        amqpAdmin.declareQueue(new Queue(WELCOME_MAILS_QUEUE_NAME));
        amqpAdmin.declareQueue(new Queue(APPLICATIONS_NEW_MAILS_QUEUE_NAME));
        amqpAdmin.declareQueue(new Queue(APPLICATIONS_APPROVED_MAILS_QUEUE_NAME));
        amqpAdmin.declareQueue(new Queue(APPLICATIONS_REJECTED_MAILS_QUEUE_NAME));
    }

    @Bean
    public Jackson2JsonMessageConverter converter() {
        return new Jackson2JsonMessageConverter();
    }
}
