package com.store.backend.config;

import com.store.backend.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;


@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Autowired
    private UserService userDetailsService;

//    @Autowired
//    JwtAuthenticationFilter authenticationFilter;

    @Autowired
    private CustomAuthenticationProvider customAuthenticationProvider;
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        http.sessionManagement(management->management.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(Authorize->
                                Authorize.requestMatchers("/user/login").permitAll()
                                        .anyRequest().authenticated()


                )
                .csrf(csrf->csrf.disable());




//        http.sessionManagement(management->management.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
//                //.authorizeHttpRequests(Authorize-> Authorize.requestMatchers("/user/login").permitAll())
//
//
//                .csrf(csrf->csrf.disable())
//                ;
//
//        http.authorizeHttpRequests(request -> request.anyRequest()
//                        .authenticated())
//                .httpBasic(Customizer.withDefaults())
//                .build();

        //http.authorizeRequests().antMatchers("/api/p/**","/**").permitAll();


        http.addFilterBefore(jwtAuthenticationFilter(), UsernamePasswordAuthenticationFilter.class);
        return http.build();

    }


    @Bean
    public JwtAuthenticationFilter jwtAuthenticationFilter() {
        return new JwtAuthenticationFilter();
    }

    @Bean
    public AuthenticationManager authManager(HttpSecurity http) throws Exception {
        AuthenticationManagerBuilder authenticationManagerBuilder = http.getSharedObject(AuthenticationManagerBuilder.class);
        authenticationManagerBuilder.authenticationProvider(customAuthenticationProvider);
        return authenticationManagerBuilder.build();
    }
}
