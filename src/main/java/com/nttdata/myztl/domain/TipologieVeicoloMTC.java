package com.nttdata.myztl.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A TipologieVeicoloMTC.
 */
@Entity
@Table(name = "tipologie_veicolo_mtc")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class TipologieVeicoloMTC implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "descrizione", nullable = false)
    private String descrizione;

    @ManyToOne
    @JsonIgnoreProperties(value = "tipologieVeicoloMTCS", allowSetters = true)
    private TipologiaVeicolo tipologiaVeicolo;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescrizione() {
        return descrizione;
    }

    public TipologieVeicoloMTC descrizione(String descrizione) {
        this.descrizione = descrizione;
        return this;
    }

    public void setDescrizione(String descrizione) {
        this.descrizione = descrizione;
    }

    public TipologiaVeicolo getTipologiaVeicolo() {
        return tipologiaVeicolo;
    }

    public TipologieVeicoloMTC tipologiaVeicolo(TipologiaVeicolo tipologiaVeicolo) {
        this.tipologiaVeicolo = tipologiaVeicolo;
        return this;
    }

    public void setTipologiaVeicolo(TipologiaVeicolo tipologiaVeicolo) {
        this.tipologiaVeicolo = tipologiaVeicolo;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof TipologieVeicoloMTC)) {
            return false;
        }
        return id != null && id.equals(((TipologieVeicoloMTC) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "TipologieVeicoloMTC{" +
            "id=" + getId() +
            ", descrizione='" + getDescrizione() + "'" +
            "}";
    }
}
