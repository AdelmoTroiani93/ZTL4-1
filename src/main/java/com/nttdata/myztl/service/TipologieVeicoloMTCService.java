package com.nttdata.myztl.service;

import com.nttdata.myztl.domain.TipologieVeicoloMTC;
import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link TipologieVeicoloMTC}.
 */
public interface TipologieVeicoloMTCService {
    /**
     * Save a tipologieVeicoloMTC.
     *
     * @param tipologieVeicoloMTC the entity to save.
     * @return the persisted entity.
     */
    TipologieVeicoloMTC save(TipologieVeicoloMTC tipologieVeicoloMTC);

    /**
     * Get all the tipologieVeicoloMTCS.
     *
     * @return the list of entities.
     */
    List<TipologieVeicoloMTC> findAll();

    /**
     * Get the "id" tipologieVeicoloMTC.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<TipologieVeicoloMTC> findOne(Long id);

    /**
     * Delete the "id" tipologieVeicoloMTC.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
