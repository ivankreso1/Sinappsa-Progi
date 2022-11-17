package com.example.projekt.rest;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
// @Profile("basic-security")
@EnableGlobalMethodSecurity(securedEnabled = true)
public class WebSecurityBasic {        // samo da izbjegnem onaj login koji se automatski napravi kad dodas spring-boot-starter-security dependency
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.httpBasic();
        http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
        http.authorizeRequests().antMatchers("/").permitAll();
        http.headers().frameOptions().sameOrigin(); // fixes h2-console problem
        http.csrf().disable();
        return http.build();
    }
}
