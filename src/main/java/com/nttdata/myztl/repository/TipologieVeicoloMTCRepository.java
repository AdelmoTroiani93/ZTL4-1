package com.nttdata.myztl.repository;

import com.nttdata.myztl.domain.TipologieVeicoloMTC;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the TipologieVeicoloMTC entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TipologieVeicoloMTCRepository extends JpaRepository<TipologieVeicoloMTC, Long> {}
