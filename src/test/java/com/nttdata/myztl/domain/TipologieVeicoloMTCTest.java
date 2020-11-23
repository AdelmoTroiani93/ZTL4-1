package com.nttdata.myztl.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.nttdata.myztl.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

public class TipologieVeicoloMTCTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TipologieVeicoloMTC.class);
        TipologieVeicoloMTC tipologieVeicoloMTC1 = new TipologieVeicoloMTC();
        tipologieVeicoloMTC1.setId(1L);
        TipologieVeicoloMTC tipologieVeicoloMTC2 = new TipologieVeicoloMTC();
        tipologieVeicoloMTC2.setId(tipologieVeicoloMTC1.getId());
        assertThat(tipologieVeicoloMTC1).isEqualTo(tipologieVeicoloMTC2);
        tipologieVeicoloMTC2.setId(2L);
        assertThat(tipologieVeicoloMTC1).isNotEqualTo(tipologieVeicoloMTC2);
        tipologieVeicoloMTC1.setId(null);
        assertThat(tipologieVeicoloMTC1).isNotEqualTo(tipologieVeicoloMTC2);
    }
}
