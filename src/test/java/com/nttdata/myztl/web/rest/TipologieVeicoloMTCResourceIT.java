package com.nttdata.myztl.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.nttdata.myztl.MyZtl4App;
import com.nttdata.myztl.domain.TipologieVeicoloMTC;
import com.nttdata.myztl.repository.TipologieVeicoloMTCRepository;
import com.nttdata.myztl.service.TipologieVeicoloMTCService;
import java.util.List;
import javax.persistence.EntityManager;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

/**
 * Integration tests for the {@link TipologieVeicoloMTCResource} REST controller.
 */
@SpringBootTest(classes = MyZtl4App.class)
@AutoConfigureMockMvc
@WithMockUser
public class TipologieVeicoloMTCResourceIT {
    private static final String DEFAULT_DESCRIZIONE = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIZIONE = "BBBBBBBBBB";

    @Autowired
    private TipologieVeicoloMTCRepository tipologieVeicoloMTCRepository;

    @Autowired
    private TipologieVeicoloMTCService tipologieVeicoloMTCService;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restTipologieVeicoloMTCMockMvc;

    private TipologieVeicoloMTC tipologieVeicoloMTC;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static TipologieVeicoloMTC createEntity(EntityManager em) {
        TipologieVeicoloMTC tipologieVeicoloMTC = new TipologieVeicoloMTC().descrizione(DEFAULT_DESCRIZIONE);
        return tipologieVeicoloMTC;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static TipologieVeicoloMTC createUpdatedEntity(EntityManager em) {
        TipologieVeicoloMTC tipologieVeicoloMTC = new TipologieVeicoloMTC().descrizione(UPDATED_DESCRIZIONE);
        return tipologieVeicoloMTC;
    }

    @BeforeEach
    public void initTest() {
        tipologieVeicoloMTC = createEntity(em);
    }

    @Test
    @Transactional
    public void createTipologieVeicoloMTC() throws Exception {
        int databaseSizeBeforeCreate = tipologieVeicoloMTCRepository.findAll().size();
        // Create the TipologieVeicoloMTC
        restTipologieVeicoloMTCMockMvc
            .perform(
                post("/api/tipologie-veicolo-mtcs")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(tipologieVeicoloMTC))
            )
            .andExpect(status().isCreated());

        // Validate the TipologieVeicoloMTC in the database
        List<TipologieVeicoloMTC> tipologieVeicoloMTCList = tipologieVeicoloMTCRepository.findAll();
        assertThat(tipologieVeicoloMTCList).hasSize(databaseSizeBeforeCreate + 1);
        TipologieVeicoloMTC testTipologieVeicoloMTC = tipologieVeicoloMTCList.get(tipologieVeicoloMTCList.size() - 1);
        assertThat(testTipologieVeicoloMTC.getDescrizione()).isEqualTo(DEFAULT_DESCRIZIONE);
    }

    @Test
    @Transactional
    public void createTipologieVeicoloMTCWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = tipologieVeicoloMTCRepository.findAll().size();

        // Create the TipologieVeicoloMTC with an existing ID
        tipologieVeicoloMTC.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTipologieVeicoloMTCMockMvc
            .perform(
                post("/api/tipologie-veicolo-mtcs")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(tipologieVeicoloMTC))
            )
            .andExpect(status().isBadRequest());

        // Validate the TipologieVeicoloMTC in the database
        List<TipologieVeicoloMTC> tipologieVeicoloMTCList = tipologieVeicoloMTCRepository.findAll();
        assertThat(tipologieVeicoloMTCList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkDescrizioneIsRequired() throws Exception {
        int databaseSizeBeforeTest = tipologieVeicoloMTCRepository.findAll().size();
        // set the field null
        tipologieVeicoloMTC.setDescrizione(null);

        // Create the TipologieVeicoloMTC, which fails.

        restTipologieVeicoloMTCMockMvc
            .perform(
                post("/api/tipologie-veicolo-mtcs")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(tipologieVeicoloMTC))
            )
            .andExpect(status().isBadRequest());

        List<TipologieVeicoloMTC> tipologieVeicoloMTCList = tipologieVeicoloMTCRepository.findAll();
        assertThat(tipologieVeicoloMTCList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllTipologieVeicoloMTCS() throws Exception {
        // Initialize the database
        tipologieVeicoloMTCRepository.saveAndFlush(tipologieVeicoloMTC);

        // Get all the tipologieVeicoloMTCList
        restTipologieVeicoloMTCMockMvc
            .perform(get("/api/tipologie-veicolo-mtcs?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(tipologieVeicoloMTC.getId().intValue())))
            .andExpect(jsonPath("$.[*].descrizione").value(hasItem(DEFAULT_DESCRIZIONE)));
    }

    @Test
    @Transactional
    public void getTipologieVeicoloMTC() throws Exception {
        // Initialize the database
        tipologieVeicoloMTCRepository.saveAndFlush(tipologieVeicoloMTC);

        // Get the tipologieVeicoloMTC
        restTipologieVeicoloMTCMockMvc
            .perform(get("/api/tipologie-veicolo-mtcs/{id}", tipologieVeicoloMTC.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(tipologieVeicoloMTC.getId().intValue()))
            .andExpect(jsonPath("$.descrizione").value(DEFAULT_DESCRIZIONE));
    }

    @Test
    @Transactional
    public void getNonExistingTipologieVeicoloMTC() throws Exception {
        // Get the tipologieVeicoloMTC
        restTipologieVeicoloMTCMockMvc.perform(get("/api/tipologie-veicolo-mtcs/{id}", Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTipologieVeicoloMTC() throws Exception {
        // Initialize the database
        tipologieVeicoloMTCService.save(tipologieVeicoloMTC);

        int databaseSizeBeforeUpdate = tipologieVeicoloMTCRepository.findAll().size();

        // Update the tipologieVeicoloMTC
        TipologieVeicoloMTC updatedTipologieVeicoloMTC = tipologieVeicoloMTCRepository.findById(tipologieVeicoloMTC.getId()).get();
        // Disconnect from session so that the updates on updatedTipologieVeicoloMTC are not directly saved in db
        em.detach(updatedTipologieVeicoloMTC);
        updatedTipologieVeicoloMTC.descrizione(UPDATED_DESCRIZIONE);

        restTipologieVeicoloMTCMockMvc
            .perform(
                put("/api/tipologie-veicolo-mtcs")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedTipologieVeicoloMTC))
            )
            .andExpect(status().isOk());

        // Validate the TipologieVeicoloMTC in the database
        List<TipologieVeicoloMTC> tipologieVeicoloMTCList = tipologieVeicoloMTCRepository.findAll();
        assertThat(tipologieVeicoloMTCList).hasSize(databaseSizeBeforeUpdate);
        TipologieVeicoloMTC testTipologieVeicoloMTC = tipologieVeicoloMTCList.get(tipologieVeicoloMTCList.size() - 1);
        assertThat(testTipologieVeicoloMTC.getDescrizione()).isEqualTo(UPDATED_DESCRIZIONE);
    }

    @Test
    @Transactional
    public void updateNonExistingTipologieVeicoloMTC() throws Exception {
        int databaseSizeBeforeUpdate = tipologieVeicoloMTCRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTipologieVeicoloMTCMockMvc
            .perform(
                put("/api/tipologie-veicolo-mtcs")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(tipologieVeicoloMTC))
            )
            .andExpect(status().isBadRequest());

        // Validate the TipologieVeicoloMTC in the database
        List<TipologieVeicoloMTC> tipologieVeicoloMTCList = tipologieVeicoloMTCRepository.findAll();
        assertThat(tipologieVeicoloMTCList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteTipologieVeicoloMTC() throws Exception {
        // Initialize the database
        tipologieVeicoloMTCService.save(tipologieVeicoloMTC);

        int databaseSizeBeforeDelete = tipologieVeicoloMTCRepository.findAll().size();

        // Delete the tipologieVeicoloMTC
        restTipologieVeicoloMTCMockMvc
            .perform(delete("/api/tipologie-veicolo-mtcs/{id}", tipologieVeicoloMTC.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<TipologieVeicoloMTC> tipologieVeicoloMTCList = tipologieVeicoloMTCRepository.findAll();
        assertThat(tipologieVeicoloMTCList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
