package org.fastpay;

import org.fastpay.config.*;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.boot.autoconfigure.security.servlet.UserDetailsServiceAutoConfiguration;
import org.springframework.context.annotation.Import;

@SpringBootApplication(scanBasePackages = {
		"org.fastpay"}, exclude = {SecurityAutoConfiguration.class, UserDetailsServiceAutoConfiguration.class, DataSourceAutoConfiguration.class})
@Import( {SecurityConfigurer.class, SecurityProperties.class, SecurityContextUtils.class, OAuth2RestTemplateConfigurer.class, JwtAccessTokenCustomizer.class})
public class AccountServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(AccountServiceApplication.class, args);
	}

}
