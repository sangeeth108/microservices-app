package com.example.demo.config;

import com.example.demo.entity.Order;
import com.example.demo.entity.OrderItem;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.HttpMethod;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

@Configuration
public class MyDataRestConfig implements RepositoryRestConfigurer {

    private final String theAllowedOrigins = "http://localhost:3001"; // React frontend

    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config, CorsRegistry cors) {
        HttpMethod[] theUnsupportedActions = { HttpMethod.PUT };

        // Expose IDs for User entity

        config.exposeIdsFor(Order.class);
        config.exposeIdsFor(OrderItem.class);

        // Disable unsupported HTTP methods
        disableHttpMethods(Order.class, config, theUnsupportedActions);
        disableHttpMethods(OrderItem.class, config, theUnsupportedActions);


        // Enable CORS for the frontend (including DELETE)
        cors.addMapping("/**")
                .allowedOrigins(theAllowedOrigins)
                .allowedMethods("GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS")
                .allowCredentials(true);
    }

    private void disableHttpMethods(Class<?> theClass, RepositoryRestConfiguration config, HttpMethod[] theUnsupportedActions) {
        config.getExposureConfiguration()
                .forDomainType(theClass)
                .withItemExposure((metadata, httpMethods) -> httpMethods.disable(theUnsupportedActions))
                .withCollectionExposure((metadata, httpMethods) -> httpMethods.disable(theUnsupportedActions));
    }
}
