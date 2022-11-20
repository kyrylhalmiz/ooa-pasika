package com.rentler.helper.mapper;

import org.modelmapper.Converter;
import org.modelmapper.ModelMapper;

import java.util.Objects;

public abstract class Mapper<E, D> {

    protected final ModelMapper mapper;
    private final Class<E> entityClass;
    private final Class<D> dtoClass;

    public Mapper(Class<E> entityClass, Class<D> dtoClass) {
        this.entityClass = entityClass;
        this.dtoClass = dtoClass;
        mapper = new ModelMapper();
    }

    public E toEntity(D dto) {
        return Objects.isNull(dto)
                ? null
                : mapper.map(dto, entityClass);
    }

    public D toDto(E entity) {
        return Objects.isNull(entity)
                ? null
                : mapper.map(entity, dtoClass);
    }

    protected Converter<E, D> toDtoConverter() {
        return context -> {
            E source = context.getSource();
            D destination = context.getDestination();
            mapEntityFields(source, destination);
            return context.getDestination();
        };
    }

    protected Converter<D, E> toEntityConverter() {
        return context -> {
            D source = context.getSource();
            E destination = context.getDestination();
            mapDtoFields(source, destination);
            return context.getDestination();
        };
    }

    protected void mapEntityFields(E source, D destination) {
    }

    protected void mapDtoFields(D source, E destination) {
    }
}

