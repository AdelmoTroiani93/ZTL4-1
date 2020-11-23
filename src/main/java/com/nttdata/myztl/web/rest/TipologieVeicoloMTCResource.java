package com.nttdata.myztl.web.rest;

import com.nttdata.myztl.domain.TipologieVeicoloMTC;
import com.nttdata.myztl.service.TipologieVeicoloMTCService;
import com.nttdata.myztl.web.rest.errors.BadRequestAlertException;
import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;
import javax.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * REST controller for managing {@link com.nttdata.myztl.domain.TipologieVeicoloMTC}.
 */
@RestController
@RequestMapping("/api")
public class TipologieVeicoloMTCResource {
    private final Logger log = LoggerFactory.getLogger(TipologieVeicoloMTCResource.class);

    private static final String ENTITY_NAME = "tipologieVeicoloMTC";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final TipologieVeicoloMTCService tipologieVeicoloMTCService;

    public TipologieVeicoloMTCResource(TipologieVeicoloMTCService tipologieVeicoloMTCService) {
        this.tipologieVeicoloMTCService = tipologieVeicoloMTCService;
    }

    /**
     * {@code POST  /tipologie-veicolo-mtcs} : Create a new tipologieVeicoloMTC.
     *
     * @param tipologieVeicoloMTC the tipologieVeicoloMTC to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new tipologieVeicoloMTC, or with status {@code 400 (Bad Request)} if the tipologieVeicoloMTC has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/tipologie-veicolo-mtcs")
    public ResponseEntity<TipologieVeicoloMTC> createTipologieVeicoloMTC(@Valid @RequestBody TipologieVeicoloMTC tipologieVeicoloMTC)
        throws URISyntaxException {
        log.debug("REST request to save TipologieVeicoloMTC : {}", tipologieVeicoloMTC);
        if (tipologieVeicoloMTC.getId() != null) {
            throw new BadRequestAlertException("A new tipologieVeicoloMTC cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TipologieVeicoloMTC result = tipologieVeicoloMTCService.save(tipologieVeicoloMTC);
        return ResponseEntity
            .created(new URI("/api/tipologie-veicolo-mtcs/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /tipologie-veicolo-mtcs} : Updates an existing tipologieVeicoloMTC.
     *
     * @param tipologieVeicoloMTC the tipologieVeicoloMTC to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated tipologieVeicoloMTC,
     * or with status {@code 400 (Bad Request)} if the tipologieVeicoloMTC is not valid,
     * or with status {@code 500 (Internal Server Error)} if the tipologieVeicoloMTC couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/tipologie-veicolo-mtcs")
    public ResponseEntity<TipologieVeicoloMTC> updateTipologieVeicoloMTC(@Valid @RequestBody TipologieVeicoloMTC tipologieVeicoloMTC)
        throws URISyntaxException {
        log.debug("REST request to update TipologieVeicoloMTC : {}", tipologieVeicoloMTC);
        if (tipologieVeicoloMTC.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        TipologieVeicoloMTC result = tipologieVeicoloMTCService.save(tipologieVeicoloMTC);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, tipologieVeicoloMTC.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /tipologie-veicolo-mtcs} : get all the tipologieVeicoloMTCS.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of tipologieVeicoloMTCS in body.
     */
    @GetMapping("/tipologie-veicolo-mtcs")
    public List<TipologieVeicoloMTC> getAllTipologieVeicoloMTCS() {
        log.debug("REST request to get all TipologieVeicoloMTCS");
        return tipologieVeicoloMTCService.findAll();
    }

    /**
     * {@code GET  /tipologie-veicolo-mtcs/:id} : get the "id" tipologieVeicoloMTC.
     *
     * @param id the id of the tipologieVeicoloMTC to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the tipologieVeicoloMTC, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/tipologie-veicolo-mtcs/{id}")
    public ResponseEntity<TipologieVeicoloMTC> getTipologieVeicoloMTC(@PathVariable Long id) {
        log.debug("REST request to get TipologieVeicoloMTC : {}", id);
        Optional<TipologieVeicoloMTC> tipologieVeicoloMTC = tipologieVeicoloMTCService.findOne(id);
        return ResponseUtil.wrapOrNotFound(tipologieVeicoloMTC);
    }

    /**
     * {@code DELETE  /tipologie-veicolo-mtcs/:id} : delete the "id" tipologieVeicoloMTC.
     *
     * @param id the id of the tipologieVeicoloMTC to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/tipologie-veicolo-mtcs/{id}")
    public ResponseEntity<Void> deleteTipologieVeicoloMTC(@PathVariable Long id) {
        log.debug("REST request to delete TipologieVeicoloMTC : {}", id);
        tipologieVeicoloMTCService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
