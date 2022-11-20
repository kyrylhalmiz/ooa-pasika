package com.rentler.helper.exception;

import com.fasterxml.jackson.databind.exc.InvalidFormatException;
import feign.FeignException;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.web.servlet.error.ErrorAttributes;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;

import java.io.IOException;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Slf4j
@RestControllerAdvice
@AllArgsConstructor
@Getter
public class CustomExceptionHandler {

    private final ErrorAttributes errorAttributes;

    private Map<String, Object> getErrorAttributes(WebRequest webRequest) {
        return new HashMap<>(
                errorAttributes.getErrorAttributes(webRequest, true));
    }

    @ExceptionHandler(RuntimeException.class)
    public final ResponseEntity<Object> handleRuntimeException(
            RuntimeException exception, WebRequest request) {
        log.error(exception.getMessage(), exception);

        ExceptionResponse response = new ExceptionResponse(getErrorAttributes(request));
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public final ResponseEntity<Object> handleMethodArgumentNotValidException(
            MethodArgumentNotValidException exception, WebRequest request) {
        log.error(exception.getMessage(), exception);

        Map<String, Object> errorAttributes = getErrorAttributes(request);

        ExceptionResponse response = new ExceptionResponse(errorAttributes);

        response.setMessage("Validation failed");

        List<String> errorMessages = ((List<FieldError>) errorAttributes.get("errors"))
                .stream()
                .map(e -> String.format("%s - %s", e.getField(), e.getDefaultMessage()))
                .collect(Collectors.toList());

        response.setErrors(errorMessages);

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
    }

    @ExceptionHandler(FeignException.class)
    public final ResponseEntity<Object> handleFeignException(
            FeignException exception, WebRequest request) throws IOException {
        log.error(exception.getMessage(), exception);

        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .contentType(MediaType.APPLICATION_JSON)
                .body(new ExceptionResponse(exception.contentUTF8()));
    }

    @ExceptionHandler(HttpMessageNotReadableException.class)
    public final ResponseEntity<Object> handleHttpMessageNotReadableException(
            HttpMessageNotReadableException exception, WebRequest request) throws IOException {
        log.error(exception.getMessage(), exception);

        if (exception.getCause() instanceof InvalidFormatException) {
            InvalidFormatException ex = (InvalidFormatException) exception.getCause();

            String fieldName = ex.getPath().get(0).getFieldName();
            String fieldValue = ex.getValue().toString();

            String message = String.format("%s - is invalid value for field '%s'.\n",
                    fieldValue, fieldName);

            if (ex.getTargetType().getPackageName().endsWith(".enums")) {
                message += "Possible values: " +
                        Arrays.stream(ex.getTargetType().getEnumConstants())
                                .map(Object::toString)
                                .reduce((a, b) -> String.format("%s, %s", a, b))
                                .get();
            }

            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(new ExceptionResponse(message));
        }

        return handleRuntimeException(exception, request);

    }
}
