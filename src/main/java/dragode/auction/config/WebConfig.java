package dragode.auction.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import dragode.auction.common.Constant;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.MediaType;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.http.converter.StringHttpMessageConverter;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.web.servlet.config.annotation.ContentNegotiationConfigurer;
import org.springframework.web.servlet.config.annotation.DefaultServletHandlerConfigurer;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

import java.text.SimpleDateFormat;
import java.util.List;


@Configuration
@EnableWebMvc
@ComponentScan(basePackages = "dragode.auction.controller")
public class WebConfig extends WebMvcConfigurerAdapter {

    @Override
    public void configureContentNegotiation(ContentNegotiationConfigurer configurer) {
        configurer.favorPathExtension(false).favorParameter(false);
        configurer.defaultContentType(MediaType.APPLICATION_JSON);
    }

    @Override
    public void configureMessageConverters(List<HttpMessageConverter<?>> converters) {
        StringHttpMessageConverter stringHttpMessageConverter = new StringHttpMessageConverter();
        converters.add(stringHttpMessageConverter);

        MappingJackson2HttpMessageConverter messageConverter = new MappingJackson2HttpMessageConverter();
        ObjectMapper objectMapper = messageConverter.getObjectMapper();
        objectMapper.setDateFormat(new SimpleDateFormat(Constant.DATE_PATTERN));
        converters.add(messageConverter);
    }


    @Override
    public void configureDefaultServletHandling(DefaultServletHandlerConfigurer configurer) {
        super.configureDefaultServletHandling(configurer);
        configurer.enable();
    }
}
