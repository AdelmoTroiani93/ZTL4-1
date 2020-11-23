package com.nttdata.myztl.domain.enumeration;

/**
 * The MinutiEnum enumeration.
 */
public enum MinutiEnum {
    ZERO("00"),
    QUINDICI("15"),
    TRENTA("30"),
    QUARANTACINQUE("45");

    private final String value;

    MinutiEnum(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }
}
