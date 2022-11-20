package com.rentler.notification.service;

import com.rentler.helper.rabbit.RabbitConfig;
import com.rentler.notification.client.AccountServiceClient;
import com.rentler.notification.dto.AccountDto;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class MailService {

    private final String FIRST_NAME = "firstName";
    private final String LAST_NAME = "lastName";

    private final JavaMailSender javaMailSender;
    private final AccountServiceClient accountServiceClient;

    @Autowired
    public MailService(JavaMailSender javaMailSender,
                       AccountServiceClient accountServiceClient) {
        this.javaMailSender = javaMailSender;
        this.accountServiceClient = accountServiceClient;
    }

    @RabbitListener(queues = RabbitConfig.WELCOME_MAILS_QUEUE_NAME)
    public void welcome(String email) {
        String subject = "Welcome!";
        String text = "Welcome to Rentler!\nWe are very glad that you registered in our service.";

        sendMail(email, subject, text);
    }

    @RabbitListener(queues = RabbitConfig.APPLICATIONS_NEW_MAILS_QUEUE_NAME)
    public void newApplication(String username) {
        String subject = String.format("Hello %s %s!", FIRST_NAME, LAST_NAME);
        String text = subject + "\nThere is a new application on your property!";

        sendApplicationMail(username, subject, text);
    }

    @RabbitListener(queues = RabbitConfig.APPLICATIONS_APPROVED_MAILS_QUEUE_NAME)
    public void applicationApproved(String username) {

        String subject = String.format("Hello %s %s!", FIRST_NAME, LAST_NAME);
        String text = subject + "\nYour application was approved!";

        sendApplicationMail(username, subject, text);
    }

    @RabbitListener(queues = RabbitConfig.APPLICATIONS_REJECTED_MAILS_QUEUE_NAME)
    public void applicationRejected(String username) {

        String subject = String.format("Hello %s %s!", FIRST_NAME, LAST_NAME);
        String text = subject + "\nYour application was rejected.";

        sendApplicationMail(username, subject, text);
    }

    private void sendApplicationMail(String username, String subject, String text) {
        username = username.substring(1, username.length() - 1);
        AccountDto account = accountServiceClient.getAccount(username);

        if (account == null) {
            return;
        }

        subject = format(subject, account);
        text = format(text, account);

        sendMail(account.getEmail(), subject, text);
    }

    private String format(String message, AccountDto account) {
        return message
                .replaceAll(FIRST_NAME, account.getFirstName())
                .replaceAll(LAST_NAME, account.getLastName());
    }

    private void sendMail(String mail, String subject, String text) {
        SimpleMailMessage msg = new SimpleMailMessage();
        msg.setTo(mail);

        msg.setSubject(subject);
        msg.setText(text);

        javaMailSender.send(msg);
    }

}

