package com.example.demo.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.HttpMethod;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import com.example.demo.entity.User;

@Configuration
public class MyDataRestConfig implements RepositoryRestConfigurer {

    private final String theAllowedOrigins = "http://localhost:3000"; // React frontend

    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config, CorsRegistry cors) {
        HttpMethod[] theUnsupportedActions = { HttpMethod.PUT };

        // Expose IDs for User entity
        config.exposeIdsFor(User.class);

        // Disable unsupported HTTP methods
        disableHttpMethods(User.class, config, theUnsupportedActions);

        // Enable CORS for the frontend (including DELETE)
        cors.addMapping("/api/**")
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
