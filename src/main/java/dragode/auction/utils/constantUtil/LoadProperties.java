package dragode.auction.utils.constantUtil;

import org.springframework.core.annotation.AliasFor;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * TODO desc
 */
@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
public @interface LoadProperties {

    @AliasFor("files")
    String[] value() default {};

    @AliasFor("value")
    String[] files() default {};
}
