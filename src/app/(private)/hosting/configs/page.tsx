'use client';

import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const ConfigsPage = () => {
    const [plan, setPlan] = useState<any>(null);
    const router = useRouter();
    useEffect(() => {
      const plan = localStorage.getItem("plan");
      if (!plan) {
        router.push("/hosting/upgrade-plan");
      }
      setPlan(plan);
    }, [plan]);
    return (
        <div className="grid">
            <div className="col-12">
                <div className="card">
                    <h4>Configs Page</h4>
                    <p>Use this page to start from scratch and place your custom content.</p>
                </div>
            </div>
        </div>
    );
};

export default ConfigsPage;
