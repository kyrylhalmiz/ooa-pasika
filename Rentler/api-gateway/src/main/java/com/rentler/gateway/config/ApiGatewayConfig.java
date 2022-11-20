package com.rentler.gateway.config;

import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ApiGatewayConfig {

    @Bean
    public RouteLocator routes(RouteLocatorBuilder builder) {
        return builder.routes()
                .route(r -> r.path("/apartments/**")
                        .uri("lb://apartment-service/apartments"))
                .route(r -> r.path("/accounts/**")
                        .uri("lb://account-service/accounts"))
                .route(r -> r.path("/auth/**")
                        .uri("lb://auth-service/auth"))
                .build();

    }
}

