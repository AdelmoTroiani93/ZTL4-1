package com.nttdata.myztl.service.impl;

import com.nttdata.myztl.domain.TipologieVeicoloMTC;
import com.nttdata.myztl.repository.TipologieVeicoloMTCRepository;
import com.nttdata.myztl.service.TipologieVeicoloMTCService;
import java.util.List;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link TipologieVeicoloMTC}.
 */
@Service
@Transactional
public class TipologieVeicoloMTCServiceImpl implements TipologieVeicoloMTCService {
    private final Logger log = LoggerFactory.getLogger(TipologieVeicoloMTCServiceImpl.class);

    private final TipologieVeicoloMTCRepository tipologieVeicoloMTCRepository;

    public TipologieVeicoloMTCServiceImpl(TipologieVeicoloMTCRepository tipologieVeicoloMTCRepository) {
        this.tipologieVeicoloMTCRepository = tipologieVeicoloMTCRepository;
    }

    @Override
    public TipologieVeicoloMTC save(TipologieVeicoloMTC tipologieVeicoloMTC) {
        log.debug("Request to save TipologieVeicoloMTC : {}", tipologieVeicoloMTC);
        return tipologieVeicoloMTCRepository.save(tipologieVeicoloMTC);
    }

    @Override
    @Transactional(readOnly = true)
    public List<TipologieVeicoloMTC> findAll() {
        log.debug("Request to get all TipologieVeicoloMTCS");
        return tipologieVeicoloMTCRepository.findAll();
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<TipologieVeicoloMTC> findOne(Long id) {
        log.debug("Request to get TipologieVeicoloMTC : {}", id);
        return tipologieVeicoloMTCRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete TipologieVeicoloMTC : {}", id);
        tipologieVeicoloMTCRepository.deleteById(id);
    }
}
