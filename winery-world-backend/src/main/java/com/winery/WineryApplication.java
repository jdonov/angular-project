package com.winery;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@SpringBootApplication
@EnableDiscoveryClient
public class WineryApplication {

    public static void main(String[] args) {
        SpringApplication.run(WineryApplication.class, args);
    }

}
